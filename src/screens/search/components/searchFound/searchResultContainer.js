import {View, Text, StyleSheet} from "react-native"
import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const SearchResultContainer = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.txtResult}>Search Results</Text>
      <Text style={styles.txtNumResult}>3200</Text>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtNumResult: {fontFamily: fonts.bold, color: colors.lightRed},
    txtResult: {fontFamily: fonts.regular, color: colors.black},
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginTop: 15,
      alignItems: "center",
    },
  })

export default SearchResultContainer
