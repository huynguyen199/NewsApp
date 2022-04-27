import {Text, StyleSheet} from "react-native"
import React, {useState} from "react"
import fonts from "../../../assets/fonts"
import {useTheme} from "@react-navigation/native"
import CategoryList from "./categoryList"
import ArticleList from "./articleList"

const NewsContainer = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [selectCategoryId, setSelectCategoryId] = useState(null)

  return (
    <>
      <Text style={styles.txtLabel}>News</Text>
      <CategoryList
        selectCategoryId={selectCategoryId}
        setSelectCategoryId={setSelectCategoryId}
      />
      <ArticleList />
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
