import {View, Text, ImageBackground, StyleSheet} from "react-native"
import React, {memo} from "react"
import Button from "@components/button"
import fonts from "@assets/fonts"
import {useNavigation, useTheme} from "@react-navigation/native"
import {mainStack} from "@common/navigator"
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
            onPress={onMoveDetail}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleBtn: {width: 140, height: 50, marginTop: 10},
    boxBottom: {margin: 20},
    txtTitle: {
      color: "white",
      fontFamily: fonts.bold,
      fontSize: 20,
    },
    imageStyle: {borderRadius: 20},
    backgroundStyle: {
      width: "100%",
      height: 230,
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: 10,
    },
    txtLabel: {fontFamily: fonts.bold, fontSize: 20, color: colors.black},
    container: {marginHorizontal: 10, marginTop: 10},
  })

export default memo(FeaturedContainer)
