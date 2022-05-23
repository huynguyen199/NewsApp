import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "../../../assets/fonts"

const SearchHistoryItem = ({item}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>{item}</Text>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {color: colors.black, fontFamily: fonts.regular},
    container: {
      backgroundColor: colors.whiteSmoke,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      marginRight: 10,
      marginTop: 10,
    },
  })

export default SearchHistoryItem
