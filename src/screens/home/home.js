import {StyleSheet, View} from "react-native"
import React, {useEffect, useState, useContext} from "react"
import LeftComponent from "./components/leftComponent"
import RightComponent from "./components/rightComponent"
import NewsContainer from "./components/newsContainer"
import VirtualizedView from "@components/virtualizedView"
import SearchContainer from "./components/searchContainer"
import FeaturedContainer from "./components/featuredContainer"
import firestore from "@react-native-firebase/firestore"

import Loading from "./components/loading"
import {HomeContext} from "../../context/home"
import {getFirstOfSource} from "@services/article"
import {getALlCategory} from "@services/category"
import Header from "@components/header"
import {useTheme} from "@react-navigation/native"

const articleCollection = firestore().collection("article")

const Home = () => {
  const [article, setArticle] = useState([])
  const [duplicateArticle, setDuplicateArticle] = useState([])
  const [isLoadingFooter, setIsLoadingFooter] = useState(false)
  const [lastDocument, setLastDocument] = useState()
  const [loading, setLoading] = useState(true)
  const {selectCategoryId} = useContext(HomeContext)

  const [categoryList, setCategoryList] = useState([])
  const [articleFeatured, setArticleFeatured] = useState({})
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  useEffect(() => {
    onChangeFilterCategory()
    return () => {
      setArticle([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCategoryId, duplicateArticle])

  const onChangeFilterCategory = () => {
    if (selectCategoryId === "all") {
      setArticle(duplicateArticle)
      return
    }
    const dataArticle = [...duplicateArticle]
    const dataFiltered = dataArticle.filter(
      (item) => item.categoryId === selectCategoryId,
    )
    setArticle(dataFiltered)
  }

  useEffect(() => {
    handleCategoryList()
    handleFirstOfSource()
    fetchArticle()
    return () => {
      setArticleFeatured({})
      setCategoryList([])
    }
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
    fetchArticle()
  }

  const fetchArticle = () => {
    if (article.length > 2) {
      setIsLoadingFooter(true)
    }

    let query = articleCollection
    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }
    query
      .limit(3)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          return setIsLoadingFooter(false)
        }
        setLoading(false)
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
        makeArticleData(querySnapshot.docs)
      })
  }

  const makeArticleData = (docs) => {
    const data = []
    docs.forEach((documentSnapshot) => {
      data.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      })
    })
    let dataArticle = [...article]
    dataArticle.push(...data)
    dataArticle.sort((a, b) => b.publishedAt - a.publishedAt)
    setArticle(dataArticle)
    setDuplicateArticle(dataArticle)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <VirtualizedView>
      <View style={styles.container}>
        {/* <Header /> */}
        <Header
          containerStyle={styles.containerStyleHeader}
          leftComponent={<LeftComponent />}
          rightComponent={<RightComponent />}
        />

        {/* form search */}
        <SearchContainer />
        {/* banner featured */}
        <FeaturedContainer articleFeatured={articleFeatured} />
        {/* news list */}
        <NewsContainer
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          article={article}
          duplicateArticle={duplicateArticle}
          lastDocument={lastDocument}
          isLoadingFooter={isLoadingFooter}
          onEndReachedArticle={onEndReachedArticle}
        />
      </View>
    </VirtualizedView>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleHeader: {marginTop: 10},
    container: {flex: 1, backgroundColor: colors.white},
  })
export default React.memo(Home)
