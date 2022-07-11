import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import {addBookmark, deleteBookmarkById} from "@services/bookmark"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Ionicons} from "@common/icon"
import Lottie from "lottie-react-native"
import Toast from "react-native-toast-message"
import assets from "@assets"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import fonts from "@assets/fonts"
import {mainStack} from "@common/navigator"
import {shortString} from "../../../../utils/method"
import {sizes} from "../../../../assets/fonts"

const ArticleItem = ({item}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()
  const bookmarkRef = useRef(null)
  const [isBookmark, setIsBookmark] = useState(false)

  const onMoveDetail = () => {
    navigation.navigate(mainStack.detail, {articleId: item.id})
  }

  useEffect(() => {
    const fetchBookmark = async () => {
      if (auth().currentUser) {
        const user = await auth().currentUser.providerData[0]
        if (auth().currentUser)
          return firestore()
            .collection("bookmark")
            .where("id", "==", item.id)
            .where("userId", "==", user.uid)
            .onSnapshot((querySnapshot) => {
              if (querySnapshot.docs.length > 0) {
                setIsBookmark(true)
                bookmarkRef.current?.play(0, 50)
              } else {
                bookmarkRef.current?.play(2, 0)
                setIsBookmark(false)
                return
              }
            })
      }
    }
    fetchBookmark()
  }, [item.id])

  const onToggleBookmark = async () => {
    if (auth().currentUser) {
      const user = await auth().currentUser.providerData[0]
      if (isBookmark) {
        bookmarkRef.current?.play(10, 0)
        return await deleteBookmarkById(item.id).then(() => {})
      }

      await addBookmark({
        ...item,
        publishedAt: new Date(),
        userId: user.uid,
      }).then(() => {
        // bookmarkRef.current?.play(0, 50)
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
      })
    }
  }

  return (
    <TouchableOpacity onPress={onMoveDetail}>
      <View style={styles.container}>
        <Image
          style={styles.imageLeft}
          source={{
            uri: item.urlToImage,
          }}
        />
        <View style={styles.boxRight}>
          <Text style={styles.txtTitle}>
            {item.title.length > 20
              ? item.title.substring(0, 40) + "..."
              : item.title}
          </Text>
          <View style={styles.boxLogo}>
            <Image
              style={styles.imageLogo}
              source={{
                uri: item.source.image,
              }}
            />
            <Text style={styles.txtBrand}>
              {shortString(item.source.name, 6)}
            </Text>
            <View style={styles.boxCategory}>
              <Text style={styles.txtCategory}>
                {item.category.name.length > 10
                  ? item.category.name.substring(0, 8) + "..."
                  : item.category.name}
              </Text>
            </View>
          </View>
          <View style={styles.boxBottom}>
            <TouchableOpacity>
              <Lottie
                onPress={onToggleBookmark}
                ref={bookmarkRef}
                style={styles.lottieStyle}
                source={assets.lottieFiles.bookmark}
                autoPlay={false}
                loop={false}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    boxBottom: {
      alignItems: "flex-end",
    },
    txtCategory: {
      color: colors.lightRed,
      fontSize: sizes.h3,
      fontFamily: fonts.bold,
    },
    boxCategory: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      borderRadius: 20,
      marginLeft: 5,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lightRed,
    },
    txtBrand: {
      alignSelf: "center",
      marginLeft: 5,
      fontFamily: fonts.bold,
      color: colors.black,
      fontSize: sizes.h3,
    },
    imageLogo: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
    },
    boxLogo: {
      backgroundColor: colors.white,
      flexDirection: "row",
      marginTop: 20,
    },
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: sizes.h2,
      color: colors.black,
    },
    boxRight: {
      margin: 10,
      flex: 1,
    },
    imageLeft: {
      width: 150,
      height: 150,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    },
    container: {
      backgroundColor: colors.white,
      margin: 10,
      flexDirection: "row",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.whiteSmoke,
    },
    lottieStyle: {width: 32, height: 32},
  })

export default ArticleItem
