import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const TagItem = ({title}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>{"#" + title}</Text>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {color: colors.lightRed, fontFamily: fonts.bold},
    container: {
      paddingHorizontal: 20,
      paddingVertical: 6,
      //   backgroundColor: "red",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.lightRed,
      marginRight: 10,
    },
  })
export default TagItem
