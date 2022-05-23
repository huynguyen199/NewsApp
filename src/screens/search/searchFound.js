import {View, StyleSheet, FlatList} from "react-native"
import React, {useCallback, useEffect, useState} from "react"
import Header from "@components/header"
import LeftComponent from "./components/searchFound/leftComponent"
import {useRoute, useTheme} from "@react-navigation/native"
import SearchContainer from "./components/searchFound/searchContainer"
import CategoryList from "./components/searchFound/categoryList"
import ArticleItem from "./components/searchFound/articleItem"
import ListFooterComponent from "./components/searchFound/listFooterComponent"
import {getALlCategory} from "../../services/category"
import SearchResultContainer from "./components/searchFound/searchResultContainer"
import ListEmptyComponent from "./components/searchFound/listEmptyComponent"
import {getALlSources} from "../../services/source"
import {articleCollection} from "@services/article"
import _ from "lodash"

const SearchFound = () => {
  const {colors} = useTheme()
  const [selectCategoryId, setSelectCategoryId] = useState("all")
  const [categories, setCategories] = useState([])
  const [article, setArticle] = useState([])
  const [isLoadingFooter, setIsLoadingFooter] = useState(false)
  const [lastDocument, setLastDocument] = useState()
  const route = useRoute()
  const {titleSearch} = route.params
  const styles = makeStyles(colors)

  useEffect(() => {
    getCategoryList()
    fetchArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onSelectCategory(selectCategoryId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCategoryId])

  const onSelectCategory = useCallback((categoryId) => {
    if (categoryId === "all") {
      return fetchAllNewAfterTime()
    } else {
      return fetchNewByCategoryIdAfterTime(categoryId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let fetchNewByCategoryIdAfterTime = _.debounce((categoryId) => {
    fetchArticleByCategoryId(categoryId)
  }, 500)
  let fetchAllNewAfterTime = _.debounce(() => {
    fetchArticle()
  }, 500)

  const getCategoryList = async () => {
    const result = await getALlCategory()
    setCategories(result)
  }

  const fetchArticle = () => {
    let query = articleCollection.orderBy("title")

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }

    query
      .startAt(titleSearch)
      .endAt(titleSearch + "\uf8ff")
      .limit(6)
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

  const fetchArticleByCategoryId = (id) => {
    let query = articleCollection.orderBy("title")
    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }

    query
      .startAt(titleSearch)
      .endAt(titleSearch + "\uf8ff")
      .where("categoryId", "==", id)
      .limit(6)
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

  const makeArticleData = async (docs) => {
    const list = []
    docs.forEach((documentSnapshot) => {
      list.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      })
    })

    let articleData = [...article]
    const categoryArr = await getALlCategory()
    const sourceArr = await getALlSources()

    //filter new array
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      const findCategory = categoryArr.find(
        (categoryItem) => categoryItem.id === item.categoryId,
      )
      const findSource = sourceArr.find(
        (sourceItem) => sourceItem.id === item.sourceId,
      )

      item.source = findSource
      item.category = findCategory
    }

    articleData.push(...list)
    setIsLoadingFooter(false)
    setArticle(articleData)
  }

  const clearArticle = () => {
    setArticle([])
    setLastDocument()
  }
  const onEndReachedArticle = () => {
    selectCategoryId === "all"
      ? fetchArticle()
      : fetchArticleByCategoryId(selectCategoryId)
  }

  const renderItem = ({item}) => <ArticleItem item={item} />
  return (
    <View style={styles.container}>
      <Header
        leftComponent={<LeftComponent />}
        // containerStyle={styles.containerStyleHeader}
      />
      <SearchContainer titleSearch={titleSearch} />
      <CategoryList
        clearArticle={clearArticle}
        selectCategoryId={selectCategoryId}
        setSelectCategoryId={setSelectCategoryId}
        categoryList={categories}
      />
      <SearchResultContainer numberResults={article.length} />
      <FlatList
        style={styles.articleContainer}
        data={article}
        ListEmptyComponent={<ListEmptyComponent />}
        renderItem={renderItem}
        onEndReached={onEndReachedArticle}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          isLoadingFooter && article.length >= 5 && ListFooterComponent
        }
      />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    articleContainer: {marginTop: 0},
    container: {flex: 1, backgroundColor: colors.white},
    containerStyleHeader: {
      borderBottomWidth: 0,
    },
  })

export default SearchFound
