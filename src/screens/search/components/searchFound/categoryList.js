import {FlatList, StyleSheet, View} from "react-native"
import React from "react"
import CategoryItem from "./categoryItem"
import {useTheme} from "@react-navigation/native"

const CategoryList = ({
  categoryList,
  selectCategoryId,
  setSelectCategoryId,
  clearArticle,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const renderItem = ({item}) => (
    <CategoryItem
      clearArticle={clearArticle}
      selectCategoryId={selectCategoryId}
      setSelectCategoryId={setSelectCategoryId}
      item={item}
    />
  )
  return (
    <View style={styles.container}>
      <FlatList
        data={categoryList}
        ListHeaderComponent={
          <CategoryItem
            clearArticle={clearArticle}
            selectCategoryId={selectCategoryId}
            setSelectCategoryId={setSelectCategoryId}
            item={{name: "All", id: "all"}}
          />
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    container: {marginTop: 10, marginLeft: 10},
  })

export default CategoryList
