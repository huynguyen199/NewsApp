import {FlatList} from "react-native"
import React from "react"
import CategoryItem from "./categoryItem"

const CategoryList = ({
  categoryList,
  selectCategoryId,
  setSelectCategoryId,
}) => {
  const renderItem = ({item}) => (
    <CategoryItem
      selectCategoryId={selectCategoryId}
      setSelectCategoryId={setSelectCategoryId}
      item={item}
    />
  )

  return (
    <FlatList
      data={categoryList}
      ListHeaderComponent={
        <CategoryItem
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
  )
}

export default CategoryList
