import {View, StyleSheet, FlatList, Dimensions} from "react-native"
import React, {useCallback, useEffect, useRef, useState} from "react"
import ArticleItem from "./components/articleItem"
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native"
import Loading from "./components/loading"
import {Modalize} from "react-native-modalize"
import {Ionicons, Material} from "@common/icon"
import SelectItem from "./components/selectItem"
import {getALlCategory} from "@services/category"
import firestore from "@react-native-firebase/firestore"
import ListFooterComponent from "./components/listFooterComponent"
import {mainStack} from "@common/navigator"
import {deletePost} from "@services/post"
import ConfirmDialog from "@components/confirmDialog"
import LoadingDialog from "@components/loadingDialog"
import ListEmptyComponent from "./components/listEmptyComponent"
import ListHeaderComponent from "./components/listHeaderComponent"
import _ from "lodash"

const {height} = Dimensions.get("window")

const postCollection = firestore().collection("post")

const Post = () => {
  const [categories, setCategories] = useState([])
  const [lastDocument, setLastDocument] = useState()
  const [search, setSearch] = useState("")
  const [news, setNews] = useState([])
  const [duplicateNews, setDuplicateNews] = useState([])
  const [isLoadingFooter, setIsLoadingFooter] = useState(false)
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectCategoryId, setSelectCategoryId] = useState("all")
  const [dialog, setDialog] = useState({
    isLoading: false,
    isSuccess: false,
    isConfirm: false,
  })
  const navigation = useNavigation()
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const renderArticleItem = ({item}) => (
    <ArticleItem
      item={item}
      showOptionsModal={showOptionsModal}
      setSelectedArticleId={setSelectedArticleId}
    />
  )

  const optionRef = useRef(null)

  const showLoading = () => {
    setDialog((prev) => ({...prev, isLoading: true}))
  }

  const hideLoading = () => {
    setDialog((prev) => ({...prev, isLoading: false}))
  }

  const showConfirm = () => {
    setDialog((prev) => ({...prev, isConfirm: true}))
  }

  const hideConfirm = () => {
    setDialog((prev) => ({...prev, isConfirm: false}))
  }

  const showOptionsModal = () => {
    optionRef.current?.open()
  }
  const hideOptionsModal = () => {
    optionRef.current?.close()
  }

  useEffect(() => {
    onChangeCategory(selectCategoryId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCategoryId])

  let fetchNewsAfterTime = _.debounce((categoryId) => {
    fetchNews(categoryId)
  }, 500)

  const onChangeCategory = useCallback((categoryId) => {
    changeNewsWhileSearch()
    fetchNewsAfterTime(categoryId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeNewsWhileSearch = () => {
    if (search.length > 0) {
      let newsData = [...duplicateNews]
      newsData = newsData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      )
      setNews(newsData)
    }
  }

  useFocusEffect(
    useCallback(() => {
      onFetchCategory()
      fetchNews(selectCategoryId)
      return () => {
        setCategories([])
        setNews([])
        setDuplicateNews([])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  const onFetchCategory = async () => {
    const data = await getALlCategory()
    setCategories(data)
  }

  function fetchNews(id) {
    let query = postCollection

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument) // fetch data following the last document accessed
    }

    if (id === "all") {
      getAllPost(query)
    } else {
      getPostByCategoryId(query, id)
    }
  }

  const getPostByCategoryId = (query, id) => {
    query
      .limit(3)
      .where("categoryId", "==", id)
      .get()
      .then((querySnapshot) => {
        if (news.length > 2) {
          setIsLoadingFooter(querySnapshot.docs.length !== 0)
        }
        if (querySnapshot.docs.length === 0) {
          return setIsLoadingFooter(false)
        }
        setLoading(false)
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
        makeNewsData(querySnapshot.docs)
      })
  }

  const getAllPost = (query) => {
    query
      .limit(3)
      .get()
      .then((querySnapshot) => {
        if (news.length > 2) {
          setIsLoadingFooter(querySnapshot.docs.length !== 0)
        }
        if (querySnapshot.docs.length === 0) {
          return setIsLoadingFooter(false)
        }
        setLoading(false)
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
        makeNewsData(querySnapshot.docs)
      })
  }

  const makeNewsData = (docs) => {
    const data = []
    docs.forEach((documentSnapshot) => {
      data.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      })
    })
    let newsData = [...news]

    newsData.push(...data)
    newsData.sort((a, b) => b.publishedAt - a.publishedAt)
    setNews(newsData)
    setDuplicateNews(newsData)
  }

  const onEndReachedNews = () => {
    fetchNews(selectCategoryId)
  }

  const onMoveUpdateNews = () => {
    navigation.navigate(mainStack.createNews, {articleId: selectedArticleId})
  }

  const onDeletePost = async () => {
    showConfirm()
    hideOptionsModal()
  }

  const onAcceptDeletePost = () => {
    hideConfirm()
    showLoading()
    setTimeout(async () => {
      await deletePost(selectedArticleId).then(() => {
        let newsData = [...news]
        newsData = newsData.filter((item) => item.id !== selectedArticleId)
        setNews(newsData)
        setDuplicateNews(newsData)
        hideLoading()
      })
    }, 1000)
  }

  const onRejectDeletePost = () => {
    hideConfirm()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <FlatList
        onEndReached={onEndReachedNews}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={
          isLoadingFooter && news.length > 0 && <ListFooterComponent />
        }
        ListHeaderComponent={
          <ListHeaderComponent
            selectCategoryId={selectCategoryId}
            setSelectCategoryId={setSelectCategoryId}
            categories={categories}
            search={search}
            setSearch={setSearch}
            setNews={setNews}
            duplicateNews={duplicateNews}
            setDuplicateNews={setDuplicateNews}
            setLastDocument={setLastDocument}
          />
        }
        data={news}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.id}
      />
      <Modalize
        handlePosition={"inside"}
        modalHeight={height / 4}
        modalStyle={styles.optionModalStyle}
        // rootStyle={{alignItems: "center"}}
        ref={optionRef}>
        <View style={styles.optionContainer}>
          <SelectItem
            onPress={onMoveUpdateNews}
            icon={Material.edit}
            iconType="material"
            title={"Edit"}
          />
          <SelectItem
            icon={Ionicons.delete}
            iconType="ionicon"
            title={"Delete"}
            onPress={onDeletePost}
          />
        </View>
      </Modalize>
      <LoadingDialog isVisible={dialog.isLoading} />

      <ConfirmDialog
        isVisible={dialog.isConfirm}
        title="Are you sure want to delete this news?"
        onAccept={onAcceptDeletePost}
        onReject={onRejectDeletePost}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    optionContainer: {marginTop: 30},
    optionModalStyle: {alignItems: "center"},
    container: {backgroundColor: colors.white, flex: 1},
    containerStyleHeader: {marginTop: 10, backgroundColor: null},
  })

export default Post
