import {View, Text, ImageBackground, StyleSheet} from "react-native"
import React from "react"
import Button from "../../../components/button"
import fonts from "../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const FeaturedContainer = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.txtLabel}>Featured</Text>
      <ImageBackground
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCeVhPcF0B061dWx6Y2p6ZshztnAoVQI59g&usqp=CAU",
        }}
        resizeMode="cover"
        imageStyle={styles.imageStyle}
        style={styles.backgroundStyle}>
        <View style={styles.boxBottom}>
          <Text style={styles.txtTitle}>sadssadsadaaaaaaaa</Text>
          <Button
            containerStyle={styles.containerStyleBtn}
            title={"Read now"}
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
      color: colors.white,
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

export default FeaturedContainer
