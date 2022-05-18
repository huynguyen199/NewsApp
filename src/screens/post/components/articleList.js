import {FlatList} from "react-native"
import React from "react"
import ArticleItem from "./articleItem"

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
]
// import ListFooterComponent from "./listFooterComponent"

const ArticleList = ({article, isLoadingFooter, onEndReachedArticle}) => {
  const renderItem = ({item, index}) => <ArticleItem item={item} />

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      // onEndReached={onEndReachedArticle}
      onEndReachedThreshold={0.1}
      // ListEmptyComponent={<Text>das</Text>}
      // ListFooterComponent={() =>
      //   article.length !== 0 && isLoadingFooter && <ListFooterComponent />
      // }
    />
  )
}

export default ArticleList
