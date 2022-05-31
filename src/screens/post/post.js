import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native"
import React, {useCallback, useEffect, useRef, useState} from "react"
import ArticleItem from "./components/articleItem"
import {useFocusEffect, useNavigation, useTheme} from "@react-navigation/native"
import Loading from "./components/loading"
import {Modalize} from "react-native-modalize"
import {Ionicons, Material} from "@common/icon"
import SelectItem from "./components/selectItem"
import firestore from "@react-native-firebase/firestore"
import ListFooterComponent from "./components/listFooterComponent"
import {mainStack} from "@common/navigator"
import ConfirmDialog from "@components/confirmDialog"
import LoadingDialog from "@components/loadingDialog"
import ListEmptyComponent from "./components/listEmptyComponent"
import ListHeaderComponent from "./components/listHeaderComponent"
import _ from "lodash"
import auth from "@react-native-firebase/auth"
import WithoutAccount from "./components/withoutAccount"
//service
import {getALlCategory} from "@services/category"
import {deletePost} from "@services/post"
import {getAllUser} from "../../services/user"

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
  const [refreshing, setRefreshing] = React.useState(false)
  const navigation = useNavigation()
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onRefresh = React.useCallback(() => {
    setLoading(true)
    setRefreshing(true)
    wait(2000).then(() => {
      onFetchCategory()
      fetchNews(selectCategoryId)
      setRefreshing(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

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

  useEffect(() => {
    search.length > 0
      ? onChangeSearch(selectCategoryId, search)
      : onChangeCategory(selectCategoryId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  let fetchNewsAfterTime = _.debounce((categoryId) => {
    fetchNews(categoryId)
  }, 500)

  let fetchNewsBySeachAfterTime = _.debounce((categoryId, wordSearch) => {
    fetchNewsBySearch(categoryId, wordSearch)
  }, 500)

  const onChangeSearch = useCallback((categoryId, wordSearch) => {
    fetchNewsBySeachAfterTime(categoryId, wordSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeCategory = useCallback((categoryId) => {
    fetchNewsAfterTime(categoryId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      onFetchCategory()
      fetchNews(selectCategoryId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  const onFetchCategory = async () => {
    const data = await getALlCategory()
    setCategories(data)
  }

  function fetchNews(id) {
    let query = postCollection.orderBy("publishedAt", "desc")

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }

    id === "all" ? getAllPost(query) : getPostByCategoryId(query, id)
  }

  function fetchNewsBySearch(id, wordSearch) {
    let query = postCollection.orderBy("title")

    if (lastDocument !== undefined) {
      query = query.startAfter(lastDocument)
    }

    getPostBySearch(query, id, wordSearch)
  }

  const getPostBySearch = async (query, id, wordSearch) => {
    const user = await auth().currentUser.providerData[0]

    id === "all"
      ? query
          .where("userId", "==", user.uid)
          .where("title", ">=", wordSearch)
          .where("title", "<=", wordSearch + "\uf8ff")
          .limit(6)
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
      : query
          .where("userId", "==", user.uid)
          .where("title", ">=", wordSearch)
          .where("title", "<=", wordSearch + "\uf8ff")
          .where("categoryId", "==", id)
          .limit(6)
          .onSnapshot((querySnapshot) => {
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

  const getPostByCategoryId = async (query, id) => {
    const user = await auth().currentUser.providerData[0]
    query
      .where("userId", "==", user.uid)
      .where("categoryId", "==", id)
      .limit(6)
      .onSnapshot((querySnapshot) => {
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

  const getAllPost = async (query) => {
    const user = await auth().currentUser

    if (_.isEmpty(user)) {
      return setLoading(false)
    }

    const userId = user.providerData[0].uid

    query
      .where("userId", "==", userId)
      .limit(10)
      .onSnapshot((querySnapshot) => {
        if (news.length > 2) {
          setIsLoadingFooter(querySnapshot.docs.length !== 0)
        }
        if (querySnapshot.docs.length === 0) {
          setLoading(false)
          return setIsLoadingFooter(false)
        }
        setLoading(false)
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1])
        makeNewsData(querySnapshot.docs)
      })
  }

  const makeNewsData = async (docs) => {
    const data = []
    docs.forEach((documentSnapshot) => {
      data.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      })
    })
    let newsData = [...news]
    const categoryData = await getALlCategory()
    const userData = await getAllUser()

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const findCategory = categoryData.find(
        (categoryItem) => categoryItem.id === item.categoryId,
      )
      const findUser = userData.find((userItem) => userItem.id === item.userId)

      item.user = findUser
      item.category = findCategory
    }

    newsData.push(...data)
    setNews(newsData)
  }

  const onEndReachedNews = () => {
    search.length > 0
      ? onChangeSearch(selectCategoryId, search)
      : fetchNews(selectCategoryId)
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
  const clearArticle = () => {
    setNews([])
    setDuplicateNews([])
    setLastDocument()
  }

  const onRejectDeletePost = () => {
    hideConfirm()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      {auth().currentUser ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={onEndReachedNews}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={<ListEmptyComponent />}
          ListFooterComponent={
            isLoadingFooter && news.length > 0 && <ListFooterComponent />
          }
          ListHeaderComponent={
            <ListHeaderComponent
              clearArticle={clearArticle}
              selectCategoryId={selectCategoryId}
              setSelectCategoryId={setSelectCategoryId}
              categories={categories}
              search={search}
              setSearch={setSearch}
              setNews={setNews}
              duplicateNews={duplicateNews}
            />
          }
          data={news}
          renderItem={renderArticleItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <WithoutAccount />
      )}
      <Modalize
        handlePosition={"inside"}
        modalHeight={height / 5}
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
