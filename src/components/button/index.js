import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"

const Button = ({title, onPress}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.txtTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      color: colors.white,
      fontFamily: "SourceSansPro-Bold",
      fontSize: 16,
    },
    container: {
      backgroundColor: "rgba(253,64,94,255)",
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
    },
  })
export default Button
