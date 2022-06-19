import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const ArticleItem = ({item, setSelectLinkItem, showConfirmDialog}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onDeleteLink = async () => {
    setSelectLinkItem(item)
    showConfirmDialog()
  }

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image
          style={styles.imageLeft}
          source={{
            uri: item.logo,
          }}
        />
        <View style={styles.boxRight}>
          <Text style={styles.txtTitle}>
            {item.title.length > 20
              ? item.title.substring(0, 20) + "..."
              : item.title}
          </Text>
          <View style={styles.boxLogo}>
            <Text style={styles.txtCateogryTitle}>{item.category}</Text>
            <Text style={styles.txtBrand}>{item.domain}</Text>
            <View style={styles.boxLogoRss}>
              <Icon
                name={Ionicons.logoRss}
                type="ionicon"
                size={30}
                color={colors.white}
              />
            </View>
          </View>
          <View style={styles.boxBottom}>
            <TouchableOpacity onPress={onDeleteLink}>
              <Icon
                name={Ionicons.delete}
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
    boxLogoRss: {
      backgroundColor: "orange",
      padding: 2,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.whiteSmoke,
      marginTop: 10,
    },
    optionIconStyle: {
      marginRight: 5,
    },
    lottieStyle: {width: 50, height: 50},
    boxBottom: {
      alignItems: "flex-end",
    },
    txtCategory: {
      color: colors.lightRed,
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
      fontFamily: fonts.regular,
      marginTop: 10,
    },
    txtCateogryTitle: {
      fontFamily: fonts.regular,
    },
    imageLogo: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
    },
    boxLogo: {
      backgroundColor: colors.white,
      marginTop: 10,
      alignItems: "flex-start",
    },
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.black,
    },
    boxRight: {
      margin: 10,
      width: 200,
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
