import {FlatList} from "react-native"
import React, {memo} from "react"
import CategoryItem from "./categoryItem"

const CategoryList = ({categoryList}) => {
  const renderItem = ({item}) => <CategoryItem item={item} />
  return (
    <FlatList
      data={categoryList}
      ListHeaderComponent={<CategoryItem item={{name: "All", id: "all"}} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default memo(CategoryList)
