import {FlatList, StyleSheet, View} from "react-native"

import CategoryItem from "./categoryItem"
import React from "react"

const CategoryList = ({
  data,
  selectCategoryId,
  setSelectCategoryId,
  clearArticle,
}) => {
  const renderCategoryItem = ({item}) => (
    <CategoryItem
      selectCategoryId={selectCategoryId}
      setSelectCategoryId={setSelectCategoryId}
      item={item}
      clearArticle={clearArticle}
    />
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <CategoryItem
            selectCategoryId={selectCategoryId}
            setSelectCategoryId={setSelectCategoryId}
            clearArticle={clearArticle}
            item={{name: "All", id: "all"}}
          />
        }
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {marginTop: 10, marginLeft: 5},
})

export default CategoryList
