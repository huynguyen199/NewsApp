import React, {useEffect, useState} from "react"

import {FlatList} from "react-native"
import SearchItem from "./searchItem"
import firestore from "@react-native-firebase/firestore"

const SearchList = ({search}) => {
  const [article, setArticle] = useState([])

  const renderItem = ({item}) => <SearchItem search={search} item={item} />

  useEffect(() => {
    firestore()
      .collection("article")
      .where("title", ">=", search)
      .where("title", "<=", search + "\uf8ff")
      .onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          })
        })
        setArticle(data)
      })
    return () => setArticle([])
  }, [search])

  return (
    <FlatList
      data={article}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default SearchList
