import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native"
import React from "react"
import fonts from "@assets/fonts"
import {useNavigation, useTheme} from "@react-navigation/native"
import {Ionicons} from "@common/icon"
import {Icon} from "@rneui/themed"
import {mainStack} from "@common/navigator"

const ArticleItem = ({item}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveDetail = () => {
    navigation.navigate(mainStack.detail, {articleId: item.id})
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
            <Text style={styles.txtBrand}>{item.source.name}</Text>
            <View style={styles.boxCategory}>
              <Text style={styles.txtCategory}>
                {item.category.name.length > 10
                  ? item.category.name.substring(0, 8) + "..."
                  : item.category.name}
              </Text>
            </View>
          </View>
          <View style={styles.boxBottom}>
            <Icon
              name={Ionicons.bookmarkOutline}
              color={colors.lightRed}
              type="ionicon"
              size={25}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    boxBottom: {
      position: "absolute",
      bottom: 0,
      right: -5,
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
      alignSelf: "center",
      marginLeft: 5,
      fontFamily: fonts.bold,
      color: colors.black,
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
