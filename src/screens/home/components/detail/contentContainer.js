import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const ContentContainer = ({infoArticle}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const formatTextBreakline = (text) => {
    if (text) {
      const result = text.split("\\n").join("\n\n")
      return result
    }
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        {formatTextBreakline(infoArticle.content)}
      </Text>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      fontFamily: fonts.regular,
      color: colors.black,
      fontSize: 16,
      lineHeight: 25,
    },
    container: {marginTop: 20},
  })

export default ContentContainer
