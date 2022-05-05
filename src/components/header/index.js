import {View, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"

const Header = ({leftComponent, rightComponent, centerComponent}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <View style={styles.container}>
      <View>{leftComponent}</View>
      <View>{centerComponent}</View>
      <View>{rightComponent}</View>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.white,
    },
  })

export default Header
