import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "../../../../assets/fonts"

const ContentContainer = ({infoArticle}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const content = infoArticle?.content?.replaceAll("\\n", "\n\n")
  // const content = "ds"
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>{content}</Text>
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
