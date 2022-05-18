import {FlatList, StyleSheet} from "react-native"
import React, {useEffect, useState} from "react"

import {useTheme} from "@react-navigation/native"
import SourceItem from "./sourceItem"
import {getALlSources} from "@services/source"

const SourceList = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [sources, setSources] = useState([])

  const renderItem = ({item}) => <SourceItem item={item} />

  useEffect(() => {
    fetchAllSources()
  }, [])

  const fetchAllSources = async () => {
    const data = await getALlSources()
    setSources(data)
  }

  return (
    <FlatList
      data={sources}
      numColumns={2}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={(item) => item.id}
    />
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    contentContainerStyle: {
      marginTop: 10,
    },
  })

export default SourceList
