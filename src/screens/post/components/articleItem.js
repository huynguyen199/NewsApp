import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import fonts from "@assets/fonts"
import {mainStack} from "@common/navigator"
import {sizes} from "../../../assets/fonts"

const ArticleItem = ({item, showOptionsModal, setSelectedArticleId}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveDetail = () => {
    navigation.navigate(mainStack.detail, {postId: item.id})
  }

  const onTouchOptions = () => {
    showOptionsModal()
    setSelectedArticleId(item.id)
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
            {item.title.length > 40
              ? item.title.substring(0, 40) + "..."
              : item.title}
          </Text>
          <View style={styles.boxLogo}>
            <Image
              style={styles.imageLogo}
              source={{
                uri: item.user.photoUrl,
              }}
            />
            <Text style={styles.txtBrand}>
              {item.user.fullName?.length > 5
                ? item.user.fullName.substring(0, 5) + "..."
                : item.user.fullName}
            </Text>
            <View style={styles.boxCategory}>
              <Text style={styles.txtCategory}>
                {item.category?.name.length > 8
                  ? item.category.name.substring(0, 8) + "..."
                  : item.category.name}
              </Text>
            </View>
          </View>
          <View style={styles.boxBottom}>
            <TouchableOpacity onPress={onTouchOptions}>
              <Icon
                name={Ionicons.ellipsisHorizontal}
                color={colors.lightRed}
                style={styles.optionIconStyle}
                type="ionicon"
                size={25}
              />
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    optionIconStyle: {},
    lottieStyle: {width: 50, height: 50},
    boxBottom: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    txtCategory: {
      color: colors.lightRed,
      fontFamily: fonts.bold,
      fontSize: sizes.h3,
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
  })

export default ArticleItem
