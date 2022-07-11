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
import {sizes} from "../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const {width, height} = Dimensions.get("window")

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
        modalHeight={width / 1.2}
        modalStyle={styles.optionModalStyle}
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
                fontSize: sizes.h3,
              }}
              title="Cancel"
              onPress={hideBookmarkModal}
            />
            <Button
              textStyle={{
                fontSize: sizes.h3,
              }}
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
      width: 150,
      marginLeft: 10,
      borderWidth: 1,
      borderColor: colors.lightRed,
    },
    containerStyleCancel: {
      width: 150,
      marginRight: 10,
      borderWidth: 1,
      backgroundColor: colors.white,
      borderColor: colors.lightRed,
    },
    boxButtonRow: {
      flexDirection: "row",
      marginTop: 20,
      justifyContent: "center",
    },
    txtTitle: {
      color: colors.black,
      fontFamily: fonts.bold,
      fontSize: sizes.h3 + 2,
      marginTop: 20,
      textAlign: "center",
    },
    container: {
      height: height / 1.8,
      backgroundColor: colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: 5,
    },
    containerStyleHeader: {marginTop: 10},
  })

export default ConfirmBookmarkModal
