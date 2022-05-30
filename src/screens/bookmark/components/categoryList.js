import {View, FlatList, StyleSheet} from "react-native"
import React from "react"
import CategoryItem from "./categoryItem"

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
