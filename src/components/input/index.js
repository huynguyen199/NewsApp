import {StyleSheet, TextInput, View} from "react-native"

import React from "react"
import fonts from "@assets/fonts"
import {sizes} from "../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const Input = (props) => {
  const {containerStyle, rightComponent} = props
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftBox}>
        <TextInput style={styles.styleInput} {...props} />
      </View>
      <View style={styles.rightBox}>{rightComponent}</View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    rightBox: {
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    leftBox: {flex: 1},
    styleInput: {
      marginLeft: 15,
      fontFamily: fonts.bold,
      color: colors.black,
      fontSize: sizes.h3,
    },
    container: {
      backgroundColor: colors.white,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: colors.lightRed,
      flexDirection: "row",
    },
  })
export default Input
