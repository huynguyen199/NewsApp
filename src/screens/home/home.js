import React, {useContext, useEffect, useState} from "react"
import {RefreshControl, StatusBar, StyleSheet, View} from "react-native"
import {findUserById, getCurrentUserId} from "../../services/user"

import ArticleList from "./components/articleList"
import BackgroundTimer from "react-native-background-timer"
import GeneralContainer from "./components/generalContainer"
import Header from "@components/header"
import {HomeContext} from "../../context/home"
import LeftComponent from "./components/leftComponent"
import Loading from "./components/loading"
import RightComponent from "./components/rightComponent"
import {addNewArticleFromUser} from "@utils/handleRss"
import {articleCollection} from "@services/article"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import fonts from "@assets/fonts"
import {getALlCategory} from "@services/category"
import {getALlSources} from "@services/source"
import {useTheme} from "@react-navigation/native"
import {wait} from "@utils/method"

const categoryDefault = [
  "https://vnexpress.net/rss/khoa-hoc.rss",
  "https://vnexpress.net/rss/suc-khoe.rss",
  "https://vnexpress.net/rss/the-gioi.rss",
  "https://vnexpress.net/rss/so-hoa.rss",
  "https://vnexpress.net/rss/giai-tri.rss",
  "https://vnexpress.net/rss/kinh-doanh.rss",
  "https://vnexpress.net/rss/the-thao.rss",
]

const Home = () => {
  const [article, setArticle] = useState([])
  const [isLoadingFooter, setIsLoadingFooter] = useState(false)
  const [lastDocument, setLastDocument] = useState()
  const [loading, setLoading] = useState(true)
  const {selectCategoryId} = useContext(HomeContext)
  const [categoryList, setCategoryList] = useState([])
  const [articleFeatured, setArticleFeatured] = useState({})
  const [refreshing, setRefreshing] = useState(false)
  const {colors} = useTheme()

  const styles = makeStyles(colors)

  useEffect(() => {
    const delay = 40000
    const handleRssFromUser = async () => {
      const currDate = new Date()

      const dateLastest = new Date(article[0].publishedAt.toDate())

      const endDate = new Date(dateLastest)

      endDate.setMinutes(endDate.getMinutes() + 30)

      if (currDate > endDate) {
        const userId = await auth().currentUser.providerData[0].uid
        const user = await findUserById(userId)
        const links = user.links

        for (const link of links) {
          await addNewArticleFromUser(link, userId)
        }
      }
    }
    BackgroundTimer.setInterval(() => {
      // handleRssForVnExpress()
      handleRssFromUser()
    }, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  useEffect(() => {
    handleCategoryList()
    handleFirstOfSource()
    fetchArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      data = data.filter((item) => item.url.includes("vnexpress"))
    }
    setCategoryList(data)
  }

  const handleFirstOfSource = async () => {
    // const result = await getFirstOfSource()
    await firestore()
      .collection("article")
      .orderBy("publishedAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
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
      query = query.where("userId", "in", [userId, null])
    } else {
      query = query.where("userId", "==", null)
    }

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }

    query
      .where("categoryId", "==", id)
      .limit(10)
      .onSnapshot((querySnapshot) => {
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
      query = query.where("userId", "in", [userId, null])
    } else {
      query = query.where("userId", "==", null)
    }

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }

    query.limit(10).onSnapshot((snapshot) => {
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
      // setArticle([])
      setLastDocument()
      if (selectCategoryId === "all") {
        fetchArticle()
      } else {
        fetchArticleByCategoryId(selectCategoryId)
      }

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
