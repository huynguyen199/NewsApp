import {View, Text, Image, StyleSheet, Dimensions} from "react-native"
import React, {useEffect, useState} from "react"
import {useRoute, useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"
import SourceContainer from "./sourceContainer"
import ContentContainer from "./contentContainer"
import TagList from "./tagList"
import {findPostById} from "@services/post"
import {findArticleById} from "@services/article"
import {findSourceById} from "@services/source"
import {findCategoryById} from "@services/category"
import {findUserById} from "@services/user"
import WebView from "react-native-webview"
import Loading from "@components/loading"
const {width, height} = Dimensions.get("window")

const InfoContainer = ({loading, setLoading}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const route = useRoute()
  const {articleId, postId} = route.params
  const [infoArticle, setInfoArticle] = useState({})
  const [time, setTime] = useState(null)
  const [sources, setSources] = useState({})
  const [category, setCategory] = useState({})

  useEffect(() => {
    if (articleId) {
      onReceiveArticleId()
    } else if (postId) {
      onReceivePostId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId])

  useEffect(() => {
    if (articleId) {
      onFetchSources()
    } else if (postId) {
      onFetchUserById()
    }
    onFetchCategory()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoArticle])

  const onReceivePostId = async () => {
    const result = await findPostById(postId)
    setInfoArticle(result)
    const timeRelease = result.publishedAt.toDate()
    const date = new Date(timeRelease)
    setTime(date.toDateString())
  }

  const onReceiveArticleId = async () => {
    const result = await findArticleById(articleId)
    setInfoArticle(result)
    const timeRelease = result.publishedAt.toDate()
    const date = new Date(timeRelease)
    setTime(date.toDateString())
    setLoading(false)
  }

  const onFetchSources = async () => {
    if (infoArticle.sourceId) {
      const result = await findSourceById(infoArticle.sourceId)
      setSources(result)
    }
  }

  const onFetchUserById = async () => {
    if (infoArticle.userId) {
      const result = await findUserById(infoArticle.userId)
      setSources(result)
    }
  }

  const onFetchCategory = async () => {
    if (infoArticle.categoryId) {
      const result = await findCategoryById(infoArticle.categoryId)
      setCategory(result)
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (articleId) {
    return (
      <WebView
        startInLoadingState={true}
        source={{uri: infoArticle.url}}
        style={{width: width, height: height}}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgBanner}
        source={{
          uri: infoArticle.urlToImage,
        }}
      />
      <Text style={styles.txtTitle}>{infoArticle.title}</Text>

      {/* container hours */}
      <View style={styles.boxInfo}>
        <Text style={styles.txtHours}>{time}</Text>
        <View style={styles.boxCategory}>
          <Text style={styles.txtTitleCategory}>{category.name}</Text>
        </View>
      </View>
      {/* sources */}
      <SourceContainer sources={sources} />
      {/* content */}
      <ContentContainer infoArticle={infoArticle} />
      {/* tags list */}
      <TagList />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitleCategory: {fontFamily: fonts.bold, color: colors.lightRed},
    boxCategory: {
      backgroundColor: colors.white,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.lightRed,
      marginLeft: 10,
    },
    txtHours: {fontFamily: fonts.bold},
    boxInfo: {flexDirection: "row", marginTop: 10, alignItems: "center"},
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: 24,
      color: colors.black,
      marginTop: 20,
    },
    imgBanner: {width: "100%", height: 270, borderRadius: 40},
    container: {marginHorizontal: 10},
  })
export default InfoContainer
