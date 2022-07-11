import React, {useContext, useEffect, useState} from "react"
import {RefreshControl, StatusBar, StyleSheet, View} from "react-native"
import {
  addNewArticleFromUser,
  updateNewArticle,
} from "../../utils/handleArticleRss"
import {findUserById, getCurrentUserId} from "@services/user"
import {
  getAllArticleUserForToday,
  getOneLastestArticle,
} from "../../services/article"

import ArticleList from "./components/articleList"
import BackgroundTimer from "react-native-background-timer"
import GeneralContainer from "./components/generalContainer"
import Header from "@components/header"
import {HomeContext} from "@context/home"
import LeftComponent from "./components/leftComponent"
import Loading from "./components/loading"
import RightComponent from "./components/rightComponent"
import {articleCollection} from "@services/article"
import auth from "@react-native-firebase/auth"
import {categoryDefault} from "@utils/handleRss"
import firestore from "@react-native-firebase/firestore"
import fonts from "@assets/fonts"
import {getALlCategory} from "@services/category"
import {getALlSources} from "@services/source"
import {useTheme} from "@react-navigation/native"
import {wait} from "@utils/method"

const Home = () => {
  const [article, setArticle] = useState([])
  const [isLoadingFooter, setIsLoadingFooter] = useState(false)
  const [lastDocument, setLastDocument] = useState()
  const [loading, setLoading] = useState(true)
  const {selectCategoryId, setSelectCategoryId} = useContext(HomeContext)
  const [categoryList, setCategoryList] = useState([])
  const [articleFeatured, setArticleFeatured] = useState({})
  const [refreshing, setRefreshing] = useState(false)

  const {colors} = useTheme()
  const styles = makeStyles(colors)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(() => {
      handleCategoryList()
      handleFirstOfSource()
      fetchArticle()
    })
    return subscriber // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const delay = 30000
    BackgroundTimer.setInterval(async () => {
      updateArticleEveryTwoHours()
    }, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateArticleEveryTwoHours = async () => {
    const data = await getOneLastestArticle()

    const dateOfLastArticle = new Date(data.publishedAt.toDate())

    dateOfLastArticle.setMinutes(dateOfLastArticle.getMinutes() + 30)
    const curr = new Date()
    // check aritcle after 1 hour to handle
    if (curr > dateOfLastArticle) {
      const articleToday = await getAllArticleUserForToday("default")
      await updateNewArticle(articleToday)
      await checkAndUpdateNewsArticleFromLink()
    }
  }

  const checkAndUpdateNewsArticleFromLink = async () => {
    const userId = await getCurrentUserId()
    if (userId) {
      const user = await findUserById(userId)
      if ("links" in user) {
        const links = user.links
        for (const link of links) {
          await addNewArticleFromUser(link, userId)
        }
      }
    }
  }

  useEffect(() => {
    onChangeFilterCategory(selectCategoryId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCategoryId])

  const onChangeFilterCategory = (categoryId) => {
    if (categoryId === "all") {
      return fetchArticle()
    } else {
      return fetchArticleByCategoryId(categoryId)
    }
  }

  const handleCategoryList = async () => {
    let data = await getALlCategory()
    const userId = await getCurrentUserId()

    if (userId) {
      const user = await findUserById(userId)
      const links = user.links
      links
        ? (data = data.filter(
            (item) =>
              links.includes(item.url) ||
              // item.url.includes("vnexpress")
              categoryDefault.includes(item.url),
          ))
        : (data = data.filter((item) => categoryDefault.includes(item.url)))
    } else {
      // data = data.filter((item) => item.url.includes("vnexpress"))
      data = data.filter((item) => categoryDefault.includes(item.url))
    }
    setCategoryList(data)
  }

  const handleFirstOfSource = async () => {
    const userId = await getCurrentUserId()
    let query = firestore().collection("article").orderBy("publishedAt", "desc")

    if (userId) {
      query = query.where("userId", "in", ["default", userId])
    } else {
      query = query.where("userId", "==", "default")
    }

    await query
      .limit(1)
      .get()
      .then((snapshot) => {
        let result
        snapshot.forEach((documentSnapshot) => {
          result = {
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          }
        })
        setArticleFeatured(result)
      })
  }

  const onEndReachedArticle = () => {
    if (selectCategoryId === "all") {
      fetchArticle()
    } else {
      fetchArticleByCategoryId(selectCategoryId)
    }
  }

  const fetchArticleByCategoryId = async (id) => {
    let query = articleCollection

    const userId = await getCurrentUserId()

    if (userId) {
      query = query.where("userId", "in", ["default", userId])
    } else {
      query = query.where("userId", "in", ["default"])
    }

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }

    query
      .where("categoryId", "==", id)
      .limit(10)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          return setIsLoadingFooter(false)
        }
        setIsLoadingFooter(article.length !== 0)

        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
        makeArticleData(querySnapshot.docs)
      })
  }

  const fetchArticle = async () => {
    let query = firestore().collection("article").orderBy("publishedAt", "desc")
    const userId = await getCurrentUserId()

    if (userId) {
      query = query.where("userId", "in", ["default", userId])
    } else {
      query = query.where("userId", "in", ["default"])
    }

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }

    query
      .limit(10)
      .get()
      .then((snapshot) => {
        if (article.length > 2) {
          setIsLoadingFooter(snapshot.docs.length !== 0)
        }
        if (snapshot.docs.length === 0) {
          return setIsLoadingFooter(false)
        }
        setIsLoadingFooter(article.length !== 0)

        setLastDocument(snapshot.docs[snapshot.docs.length - 1])
        makeArticleData(snapshot.docs)
      })
  }
  const makeArticleData = async (docs) => {
    const data = []
    docs.forEach((documentSnapshot) => {
      data.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      })
    })

    let articleData = [...article]
    const categoryArr = await getALlCategory()
    const sourceArr = await getALlSources()

    if (refreshing) {
      articleData = []
    }

    //filter new array
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const findCategory = categoryArr.find(
        (categoryItem) => categoryItem.id === item.categoryId,
      )
      const findSource = sourceArr.find(
        (sourceItem) => sourceItem.id === item.sourceId,
      )

      item.source = findSource
      item.category = findCategory
    }

    articleData.push(...data)
    setIsLoadingFooter(false)
    setLoading(false)
    setArticle(articleData)
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setLoading(true)
    wait(2000).then(() => {
      handleCategoryList()
      handleFirstOfSource()
      setSelectCategoryId("all")
      // setArticle([])
      setLastDocument()
      fetchArticle()

      setRefreshing(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} />
      <Header
        containerStyle={styles.containerStyleHeader}
        leftComponent={<LeftComponent />}
        rightComponent={<RightComponent />}
      />
      <ArticleList
        refreshControl={
          <RefreshControl
            colors={[colors.lightRed]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        article={article}
        articleFeatured={articleFeatured}
        isLoadingFooter={isLoadingFooter}
        onEndReachedArticle={onEndReachedArticle}>
        <GeneralContainer
          setArticle={setArticle}
          setLastDocument={setLastDocument}
          articleFeatured={articleFeatured}
          categoryList={categoryList}
        />
      </ArticleList>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleHeader: {marginBottom: 5},
    container: {flex: 1, backgroundColor: colors.white},
    txtLabel: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.black,
      margin: 10,
    },
  })
export default React.memo(Home)
