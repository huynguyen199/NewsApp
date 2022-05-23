import {View, StyleSheet, FlatList} from "react-native"
import React, {useEffect, useState} from "react"
import Header from "@components/header"
import LeftComponent from "./components/searchFound/leftComponent"
import {useRoute, useTheme} from "@react-navigation/native"
import SearchContainer from "./components/searchFound/searchContainer"
import CategoryList from "./components/searchFound/categoryList"
import ArticleItem from "./components/searchFound/articleItem"
import ListFooterComponent from "./components/searchFound/listFooterComponent"
import {getALlCategory} from "../../services/category"
import SearchResultContainer from "./components/searchFound/searchResultContainer"
import ListEmptyComponent from "./components/searchFound/listEmptyComponent"

const data = [
  {
    id: 1,
    name: "test",
  },
  {
    id: 2,
    name: "tes2",
  },
  {
    id: 3,
    name: "tes2",
  },
]

const SearchFound = () => {
  const {colors} = useTheme()
  const [selectCategoryId, setSelectCategoryId] = useState("all")
  const [categories, setCategories] = useState([])
  const route = useRoute()
  const {titleSearch} = route.params
  const styles = makeStyles(colors)

  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = async () => {
    const result = await getALlCategory()
    setCategories(result)
  }

  const renderItem = ({item}) => <ArticleItem item={item} />
  return (
    <View style={styles.container}>
      <Header
        leftComponent={<LeftComponent />}
        containerStyle={styles.containerStyleHeader}
      />
      <SearchContainer titleSearch={titleSearch} />
      <CategoryList
        selectCategoryId={selectCategoryId}
        setSelectCategoryId={setSelectCategoryId}
        categoryList={categories}
      />
      <SearchResultContainer />
      <FlatList
        style={styles.articleContainer}
        data={data}
        ListEmptyComponent={<ListEmptyComponent />}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={data.length > 0 && ListFooterComponent}
      />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    articleContainer: {marginTop: 10},
    container: {flex: 1, backgroundColor: colors.white, marginTop: 30},
    containerStyleHeader: {
      borderBottomWidth: 0,
    },
  })

export default SearchFound
