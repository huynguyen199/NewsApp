import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native"
import React from "react"
import fonts from "../../../assets/fonts"
import {useTheme} from "@react-navigation/native"
import {Ionicons} from "../../../common/icon"
import {Icon} from "@rneui/themed"

const ArticleItem = ({title}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image
          style={styles.imageLeft}
          source={{
            uri: "https://static.foxnews.com/foxnews.com/content/uploads/2022/04/Elon-Musk-Twitter-staff.jpg",
          }}
        />
        <View style={styles.boxRight}>
          <Text style={styles.txtTitle}>
            Elon Musk is no saint, but much of the media is demonizing him
          </Text>
          <View style={styles.boxLogo}>
            <Image
              style={styles.imageLogo}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/BBC_News.svg/2560px-BBC_News.svg.png",
              }}
            />
            <Text style={styles.txtBrand}>CNN</Text>
            <View style={styles.boxCategory}>
              <Text style={styles.txtCategory}>Healthy</Text>
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
      right: 0,
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
      marginLeft: 10,
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
