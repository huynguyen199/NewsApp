import ArticleItem from "./articleItem"
import {FlatList} from "react-native"
import ListEmpty from "./listEmpty"
import ListFooterComponent from "./listFooterComponent"
import React from "react"

const ArticleList = ({
  article,
  isLoadingFooter,
  onEndReachedArticle,
  children,
  articleFeatured,
  refreshControl,
}) => {
  const renderItem = ({item, index}) => {
    const articleIndex = article.findIndex(
      (articleItem) => articleItem.id === articleFeatured.id,
    )
    return index !== articleIndex && <ArticleItem item={item} />
  }

  return (
    <FlatList
      data={article}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReachedArticle}
      refreshControl={refreshControl}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={<>{children}</>}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={() =>
        article.length !== 0 && isLoadingFooter && <ListFooterComponent />
      }
    />
  )
}

export default ArticleList
