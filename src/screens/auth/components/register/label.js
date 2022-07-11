import {StyleSheet, Text, View} from "react-native"

import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const Label = ({title, style, textStyle}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={style}>
      <Text style={[styles.styleLabel, textStyle]}>
        {title}
        <Text style={styles.txtTitle}>*</Text>
      </Text>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {color: colors.red},
    styleLabel: {
      fontSize: 16,
      marginLeft: 10,
      fontFamily: fonts.bold,
      color: colors.black,
    },
  })

export default Label
