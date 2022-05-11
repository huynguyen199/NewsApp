import {FlatList, StyleSheet} from "react-native"
import React from "react"
import TopicItem from "./topicItem"
import {useTheme} from "@react-navigation/native"

const TopicList = ({category, handleCheckbox}) => {
  const renderItem = ({item}) => (
    <TopicItem handleCheckbox={handleCheckbox} item={item} />
  )
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <FlatList
      data={category}
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
      // marginVertical: 0,
    },
  })

export default TopicList
