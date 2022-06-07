import React, {useEffect, useState} from "react"
import {Share, StyleSheet, View} from "react-native"
import {addBookmark, deleteBookmarkById} from "@services/bookmark"
import {useRoute, useTheme} from "@react-navigation/native"

import IconButton from "@components/iconButton"
import {Ionicons} from "@common/icon"
import Toast from "react-native-toast-message"
import auth from "@react-native-firebase/auth"
import {findArticleById} from "@services/article"
import {findPostById} from "@services/post"
import firestore from "@react-native-firebase/firestore"

const RightComponent = () => {
  const route = useRoute()
  const {articleId, postId} = route.params
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [isBookmark, setIsBookmark] = useState(false)

  useEffect(() => {
    const handleBookmark = async () => {
      if (articleId) {
        if (auth().currentUser) {
          const user = await auth().currentUser.providerData[0]
          firestore()
            .collection("bookmark")
            .where("id", "==", articleId)
            .where("userId", "==", user.uid)
            .onSnapshot((querySnapshot) => {
              if (querySnapshot.docs.length > 0) {
                setIsBookmark(true)
              }
            })
        }
      }
    }
    handleBookmark()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onShare = async () => {
    try {
      let articleResult
      if (articleId) {
        articleResult = await findArticleById(articleId)
      } else {
        articleResult = await findPostById(postId)
      }

      const result = await Share.share({
        message: articleResult.url ?? articleResult.title,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  }

  const onToggleBookmark = async () => {
    if (auth().currentUser) {
      const user = await auth().currentUser.providerData[0]
      if (isBookmark) {
        return await deleteBookmarkById(articleId).then(() =>
          setIsBookmark(false),
        )
      }

      const article = await findArticleById(articleId)

      await addBookmark({
        ...article,
        publishedAt: new Date(),
        userId: user.uid,
      }).then(() => {
        Toast.show({
          type: "tomatoToast",
          text1: "Added to bookmarks",
          text2: Ionicons.bookmark,
          position: "bottom",
        })
      })
    } else {
      Toast.show({
        type: "tomatoToast",
        text1: "You are not logged in",
        text2: Ionicons.warningOutline,
        position: "bottom",
        props: {color: "red"},
      })
    }
  }

  return (
    <View style={styles.container}>
      <IconButton onPress={onShare} name={Ionicons.shareSocial} />
      {articleId && (
        <IconButton
          name={isBookmark ? Ionicons.bookmark : Ionicons.bookmarkOutline}
          style={styles.styleBookmark}
          onPress={onToggleBookmark}
        />
      )}
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    styleEllopsis: {marginLeft: 10},
    styleBookmark: {marginLeft: 10},
    container: {flexDirection: "row"},
  })

export default RightComponent
