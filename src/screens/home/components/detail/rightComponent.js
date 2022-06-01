import {View, StyleSheet, Share} from "react-native"
import React from "react"
import {findArticleById} from "../../../../services/article"
import {findPostById} from "../../../../services/post"
import IconButton from "@components/iconButton"
import {Ionicons} from "@common/icon"
import {useRoute, useTheme} from "@react-navigation/native"

const RightComponent = () => {
  const route = useRoute()
  const {articleId, postId} = route.params
  const {colors} = useTheme()
  const styles = makeStyles(colors)

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

  return (
    <View style={styles.container}>
      <IconButton onPress={onShare} name={Ionicons.shareSocial} />
      <IconButton
        name={Ionicons.bookmarkOutline}
        style={styles.styleBookmark}
      />
      <IconButton
        name={Ionicons.ellipsisVertical}
        style={styles.styleEllopsis}
      />
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
