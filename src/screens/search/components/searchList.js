import {FlatList} from "react-native"
import React, {useCallback, useEffect, useState} from "react"
import SearchItem from "./searchItem"
import {findArticleByTitle} from "@services/article"
import _ from "lodash"

const SearchList = ({search}) => {
  const [article, setArticle] = useState([])

  const renderItem = ({item}) => <SearchItem search={search} item={item} />

  useEffect(() => {
    getArticleBySearch(search)
    return () => {
      setArticle([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const getArticleDebounce = _.debounce(async (words) => {
    const data = await findArticleByTitle(words)
    setArticle(data)
  }, 500)

  const getArticleBySearch = useCallback((words) => {
    getArticleDebounce(words)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <FlatList
        data={article}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  )
}

export default SearchList
