import {StyleSheet, Text, View} from "react-native"

import CategoryList from "./categoryList"
import FeaturedContainer from "./featuredContainer"
import React from "react"
import SearchContainer from "./searchContainer"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const GeneralContainer = ({
  articleFeatured,
  categoryList,
  setArticle,
  setLastDocument,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View>
      <SearchContainer />
      <FeaturedContainer articleFeatured={articleFeatured} />
      <Text style={styles.txtLabel}>News</Text>

      <CategoryList
        setArticle={setArticle}
        setLastDocument={setLastDocument}
        categoryList={categoryList}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleHeader: {marginTop: 10},
    txtLabel: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.black,
      margin: 10,
    },
  })

export default GeneralContainer
