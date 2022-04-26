import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const Label = ({title, style}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={style}>
      <Text style={styles.styleLabel}>
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
