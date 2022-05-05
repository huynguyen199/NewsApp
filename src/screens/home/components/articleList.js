import {FlatList} from "react-native"
import React from "react"
import ArticleItem from "./articleItem"

import ListFooterComponent from "./listFooterComponent"

const ArticleList = ({article, isLoadingFooter, onEndReachedArticle}) => {
  const renderItem = ({item, index}) =>
    index !== 0 && <ArticleItem item={item} />

  return (
    <FlatList
      data={article}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReachedArticle}
      onEndReachedThreshold={0.1}
      // ListEmptyComponent={<Text>das</Text>}
      ListFooterComponent={() =>
        article.length !== 0 && isLoadingFooter && <ListFooterComponent />
      }
    />
  )
}

export default ArticleList
