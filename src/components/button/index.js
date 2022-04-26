import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const Button = ({title, onPress, containerStyle}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.txtTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      color: colors.white,
      fontFamily: fonts.bold,
      fontSize: 16,
    },
    container: {
      backgroundColor: colors.lightRed,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
    },
  })
export default Button
