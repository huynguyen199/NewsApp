import {Dimensions, StyleSheet, Text, View} from "react-native"

import ArticleItem from "./articleItem"
import Button from "@components/button"
import {Ionicons} from "@common/icon"
import {Modalize} from "react-native-modalize"
import {Portal} from "react-native-portalize"
import React from "react"
import Toast from "react-native-toast-message"
import {deleteBookmarkById} from "@services/bookmark"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const {height} = Dimensions.get("window")

const ConfirmBookmarkModal = ({
  bookmarkRef,
  showBookmarkModal,
  hideBookmarkModal,
  selectArticleItem,
  article,
  setArticle,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onAcceptRemoveBookmark = async () => {
    await deleteBookmarkById(selectArticleItem.id).then(() => {
      hideBookmarkModal()
      Toast.show({
        type: "tomatoToast",
        text1: "Removed to bookmarks",
        text2: Ionicons.bookmark,
        position: "bottom",
      })
      deleteArticle()
    })
  }

  const deleteArticle = () => {
    const resultAfterDeleteById = article.filter(
      (item) => item.id !== selectArticleItem.id,
    )

    setArticle(resultAfterDeleteById)
  }
  return (
    <Portal>
      <Modalize
        handlePosition={"inside"}
        modalHeight={height / 2.2}
        modalStyle={styles.optionModalStyle}
        // rootStyle={{alignItems: "center"}}
        ref={bookmarkRef}>
        <View style={styles.container}>
          <ArticleItem
            canPressIcon={false}
            item={selectArticleItem}
            showBookmarkModal={showBookmarkModal}
            hideBookmarkModal={hideBookmarkModal}
            // setSelectedArticleId={setSelectedArticleId}
          />
          <Text style={styles.txtTitle}>Remove from your bookmark</Text>
          <View style={styles.boxButtonRow}>
            <Button
              containerStyle={styles.containerStyleCancel}
              textStyle={{
                color: colors.lightRed,
              }}
              title="Cancel"
              onPress={hideBookmarkModal}
            />
            <Button
              containerStyle={styles.containerStyleRemove}
              onPress={onAcceptRemoveBookmark}
              title="Yes, Remove"
            />
          </View>
        </View>
      </Modalize>
    </Portal>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    optionModalStyle: {borderTopRightRadius: 20, borderTopLeftRadius: 20},
    containerStyleRemove: {
      width: 160,
      marginLeft: 10,
      borderWidth: 1,
      borderColor: colors.lightRed,
    },
    containerStyleCancel: {
      width: 160,
      marginRight: 10,
      borderWidth: 1,
      backgroundColor: colors.white,
      borderColor: colors.lightRed,
    },
    boxButtonRow: {flexDirection: "row", marginTop: 20},
    txtTitle: {
      color: colors.black,
      fontFamily: fonts.bold,
      fontSize: 18,
      marginTop: 20,
    },
    container: {
      height: height / 2.2,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    containerStyleHeader: {marginTop: 10},
  })

export default ConfirmBookmarkModal
