import {View, ActivityIndicator, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"

const Loading = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.lightRed} />
    </View>
  )
}

export default Loading
const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center",
    },
  })
