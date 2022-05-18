import {Text, StyleSheet} from "react-native"
import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"
import CategoryList from "./categoryList"
import ArticleList from "./articleList"

const NewsContainer = (props) => {
  const {categoryList} = {...props}
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <>
      <Text style={styles.txtLabel}>News</Text>
      <CategoryList categoryList={categoryList} />
      <ArticleList {...props} />
    </>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtLabel: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.black,
      margin: 10,
    },
  })

export default NewsContainer
