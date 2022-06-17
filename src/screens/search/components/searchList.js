import React, {useEffect, useState} from "react"

import {FlatList} from "react-native"
import SearchItem from "./searchItem"
import firestore from "@react-native-firebase/firestore"
import {getCurrentUserId} from "@services/user"

const SearchList = ({search}) => {
  const [article, setArticle] = useState([])

  const renderItem = ({item}) => <SearchItem search={search} item={item} />

  useEffect(() => {
    getAticleByTitle()
    return () => setArticle([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const getAticleByTitle = async () => {
    const userId = await getCurrentUserId()
    let query = firestore().collection("article")
    if (userId) {
      query = query.where("userId", "in", [userId, null])
    } else {
      query = query.where("userId", "in", [null])
    }
    query
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
  }

  return (
    <FlatList
      data={article}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default SearchList
