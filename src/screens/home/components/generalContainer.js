import {View, Text, StyleSheet} from "react-native"
import React from "react"
import Header from "@components/header"
import fonts from "../../../assets/fonts"
import {useTheme} from "@react-navigation/native"
import SearchContainer from "./searchContainer"
import FeaturedContainer from "./featuredContainer"
import CategoryList from "./categoryList"
import LeftComponent from "./leftComponent"
import RightComponent from "./rightComponent"

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
      {/* <Header
        containerStyle={styles.containerStyleHeader}
        leftComponent={<LeftComponent />}
        rightComponent={<RightComponent />}
      /> */}
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
