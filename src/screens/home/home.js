import React, {useContext, useEffect, useState} from "react"
import {RefreshControl, StatusBar, StyleSheet, View} from "react-native"

import ArticleList from "./components/articleList"
import BackgroundTimer from "react-native-background-timer"
import GeneralContainer from "./components/generalContainer"
import Header from "../../components/header"
import {HomeContext} from "../../context/home"
import LeftComponent from "./components/leftComponent"
import Loading from "./components/loading"
import RightComponent from "./components/rightComponent"
import {articleCollection} from "@services/article"
import fonts from "@assets/fonts"
import {getALlCategory} from "@services/category"
import {getALlSources} from "@services/source"
import {getFirstOfSource} from "@services/article"
import {handleRssForVnExpress} from "../../utils/handleRss"
import {useTheme} from "@react-navigation/native"
import {wait} from "@utils/method"

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
    const delay = 60000

    BackgroundTimer.setInterval(() => {
      handleRssForVnExpress()
    }, delay)
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
    const data = await getALlCategory()
    setCategoryList(data)
  }

  const handleFirstOfSource = async () => {
    const result = await getFirstOfSource()
    setArticleFeatured(result)
  }

  const onEndReachedArticle = () => {
    if (selectCategoryId === "all") {
      fetchArticle()
    } else {
      fetchArticleByCategoryId(selectCategoryId)
    }
  }

  const fetchArticleByCategoryId = (id) => {
    let query = articleCollection
    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }
    query
      .limit(10)
      .where("categoryId", "==", id)
      // .get()
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          return setIsLoadingFooter(false)
        }
        setIsLoadingFooter(article.length !== 0)

        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
        makeArticleData(querySnapshot.docs)
      })
  }

  const fetchArticle = () => {
    let query = articleCollection.orderBy("publishedAt", "desc")

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }
    query
      .limit(10)
      // .get()
      .onSnapshot((querySnapshot) => {
        if (article.length > 2) {
          setIsLoadingFooter(querySnapshot.docs.length !== 0)
        }
        if (querySnapshot.docs.length === 0) {
          return setIsLoadingFooter(false)
        }
        setIsLoadingFooter(article.length !== 0)

        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
        makeArticleData(querySnapshot.docs)
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
      setArticle([])
      setLastDocument()
      if (selectCategoryId === "all") {
        fetchArticle()
      } else {
        fetchArticleByCategoryId(selectCategoryId)
      }
      handleFirstOfSource()
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
