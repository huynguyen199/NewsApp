import {ImageBackground, StyleSheet, Text, View} from "react-native"
import React, {memo} from "react"
import {useNavigation, useTheme} from "@react-navigation/native"

import Button from "@components/button"
import fonts from "@assets/fonts"
import {mainStack} from "@common/navigator"
import {sizes} from "../../../assets/fonts"

const FeaturedContainer = ({articleFeatured}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveDetail = () => {
    navigation.navigate(mainStack.detail, {articleId: articleFeatured.id})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtLabel}>Featured</Text>
      <ImageBackground
        source={{
          uri: articleFeatured.urlToImage,
        }}
        resizeMode="cover"
        imageStyle={styles.imageStyle}
        style={styles.backgroundStyle}>
        <View style={styles.boxBottom}>
          <Text style={styles.txtTitle}>{articleFeatured.title}</Text>
          <Button
            containerStyle={styles.containerStyleBtn}
            title={"Read now"}
            textStyle={styles.textStyleRead}
            onPress={onMoveDetail}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    textStyleRead: {fontSize: sizes.h2},
    containerStyleBtn: {
      width: 140,
      height: 50,
      marginTop: 10,
      fontSize: sizes.h2,
    },
    boxBottom: {margin: 20},
    txtTitle: {
      color: "white",
      fontFamily: fonts.bold,
      fontSize: sizes.h2,
    },
    imageStyle: {borderRadius: 20},
    backgroundStyle: {
      width: "100%",
      height: 200,
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: 10,
    },
    txtLabel: {fontFamily: fonts.bold, fontSize: sizes.h1, color: colors.black},
    container: {marginHorizontal: 10, marginTop: 10},
  })

export default memo(FeaturedContainer)
