import {FlatList} from "react-native"
import React from "react"
import CategoryItem from "./categoryItem"

const CategoryList = ({categoryList, setArticle, setLastDocument}) => {
  const renderItem = ({item}) => (
    <CategoryItem
      setArticle={setArticle}
      setLastDocument={setLastDocument}
      item={item}
    />
  )
  return (
    <FlatList
      data={categoryList}
      ListHeaderComponent={
        <CategoryItem
          setArticle={setArticle}
          setLastDocument={setLastDocument}
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
