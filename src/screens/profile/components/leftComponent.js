import {Image, StyleSheet, Text, View} from "react-native"

import React from "react"
import fonts from "@assets/fonts"
import {sizes} from "../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const LeftComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Image
        style={styles.boxLogo}
        source={{
          uri: "https://www.patentlyapple.com/.a/6a0120a5580826970c01b7c8b154b7970b-pi",
        }}
      />
      <Text style={styles.txtTitle}>My Profile</Text>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    boxLogo: {width: 40, height: 40},
    txtTitle: {
      color: colors.black,
      fontFamily: fonts.bold,
      fontSize: sizes.h1,
      marginLeft: 10,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: 300,
      marginLeft: 10,
    },
  })

export default LeftComponent
