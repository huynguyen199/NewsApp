import {FlatList, RefreshControl, StyleSheet, View} from "react-native"
import React, {useCallback, useEffect, useRef, useState} from "react"
import {findUserById, getCurrentUserId} from "@services/user"
import {useFocusEffect, useTheme} from "@react-navigation/native"

import ArticleItem from "./components/articleItem"
import BookmarkEmpty from "./components/bookmarkEmpty"
import CategoryList from "./components/categoryList"
import ConfirmBookmarkModal from "./components/confirmBookmarkModal"
import Header from "@components/header"
import LeftComponent from "./components/leftComponent"
import ListEmpty from "./components/listEmpty"
import ListFooterComponent from "./components/listFooterComponent"
import Loading from "./components/loading"
import WithoutAccount from "./components/withoutAccount"
import auth from "@react-native-firebase/auth"
import {bookmarkCollection} from "@services/bookmark"
import {categoryDefault} from "@utils/handleRss"
import {getALlCategory} from "@services/category"
import {getALlSources} from "@services/source"
import {wait} from "@utils/method"

const Bookmark = () => {
  const {colors} = useTheme()
  const [selectCategoryId, setSelectCategoryId] = useState("all")
  const [refreshing, setRefreshing] = React.useState(false)
  const [article, setArticle] = useState([])
  const [lastDocument, setLastDocument] = useState()
  const [isLoadingFooter, setIsLoadingFooter] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [selectArticleItem, setSelectArticleItem] = useState({})
  const [categoryList, setCategoryList] = useState([])

  const bookmarkRef = useRef(null)
  const styles = makeStyles(colors)

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      handleCategoryList()
      fetchBookmark()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

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
  useEffect(() => {
    if (selectCategoryId === "all") {
      fetchBookmark()
    } else {
      fetchBookmarkByCategory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCategoryId])

  const clearArticle = () => {
    setArticle([])
    setLastDocument()
  }
  const checkEmptyListOfUser = (query) => {
    query.onSnapshot((querySnapshot) => {
      setIsEmpty(querySnapshot.docs.length === 0)
    })
  }

  const fetchBookmarkByCategory = async () => {
    if (auth().currentUser) {
      const user = await auth().currentUser.providerData[0]
      let query = bookmarkCollection
        .where("userId", "==", user.uid)
        .where("categoryId", "==", selectCategoryId)

      if (lastDocument !== undefined) {
        query = query.startAfter(lastDocument)
      }

      query
        .limit(10)
        .get()
        .then((querySnapshot) => {
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
    } else {
      setArticle([])
    }
  }

  const fetchBookmark = async () => {
    if (auth().currentUser) {
      const user = await auth().currentUser.providerData[0]
      let query = bookmarkCollection
        .orderBy("publishedAt", "desc")
        .where("userId", "==", user.uid)
      checkEmptyListOfUser(query)

      if (lastDocument !== undefined) {
        query = query.startAfter(lastDocument)
      }

      query
        .limit(10)
        .get()
        .then((querySnapshot) => {
          if (article.length > 2) {
            setIsLoadingFooter(querySnapshot.docs.length !== 0)
          }
          if (querySnapshot.docs.length === 0) {
            // deleteArticle()

            return setIsLoadingFooter(false)
          }
          setIsLoadingFooter(article.length !== 0)

          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
          makeArticleData(querySnapshot.docs)
        })
    } else {
      setArticle([])
    }
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

    // articleData.sort((a, b) => b.publishedAt - a.publishedAt)
    setIsLoadingFooter(false)
    setLoading(false)
    setArticle(articleData)
  }

  const showBookmarkModal = () => {
    bookmarkRef.current?.open()
  }
  const hideBookmarkModal = () => {
    bookmarkRef.current?.close()
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setLoading(true)
    wait(2000).then(() => {
      if (selectCategoryId === "all") {
        fetchBookmark()
      } else {
        fetchBookmarkByCategory(selectCategoryId)
      }
      setLoading(false)
      setRefreshing(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onEndReachedArticle = () => {
    if (selectCategoryId === "all") {
      fetchBookmark()
    } else {
      fetchBookmarkByCategory(selectCategoryId)
    }
  }

  const renderArticleItem = ({item}) => (
    <ArticleItem
      item={item}
      setSelectArticleItem={setSelectArticleItem}
      showBookmarkModal={showBookmarkModal}
      hideBookmarkModal={hideBookmarkModal}
      // setSelectedArticleId={setSelectedArticleId}
    />
  )

  if (!auth().currentUser) {
    return <WithoutAccount />
  }

  if (isEmpty && auth().currentUser) {
    return <BookmarkEmpty />
  }
  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.containerStyleHeader}
        leftComponent={<LeftComponent />}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.lightRed]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReached={onEndReachedArticle}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<ListEmpty />}
        ListFooterComponent={
          isLoadingFooter && article.length > 0 && <ListFooterComponent />
        }
        ListHeaderComponent={
          <>
            <CategoryList
              data={categoryList}
              selectCategoryId={selectCategoryId}
              setSelectCategoryId={setSelectCategoryId}
              clearArticle={clearArticle}
            />
          </>
        }
        data={article}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.id}
      />
      <ConfirmBookmarkModal
        bookmarkRef={bookmarkRef}
        article={article}
        setArticle={setArticle}
        selectArticleItem={selectArticleItem}
        showBookmarkModal={showBookmarkModal}
        hideBookmarkModal={hideBookmarkModal}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.white},
    containerStyleHeader: {marginTop: 10, backgroundColor: null},
  })

export default Bookmark
