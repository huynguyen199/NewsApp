import {FlatList, StyleSheet} from "react-native"
import React from "react"

import {useTheme} from "@react-navigation/native"
import SourceItem from "./sourceItem"

const SourceList = ({sources, handleCheckbox}) => {
  const renderItem = ({item}) => (
    <SourceItem handleCheckbox={handleCheckbox} item={item} />
  )
  const {colors} = useTheme()
  const styles = makeStyles(colors)

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
      // marginTop: 10,
    },
  })

export default SourceList
