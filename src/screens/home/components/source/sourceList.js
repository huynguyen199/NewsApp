import {FlatList, StyleSheet} from "react-native"
import React from "react"

import {useTheme} from "@react-navigation/native"
import SourceItem from "./sourceItem"

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

const SourceList = () => {
  const renderItem = ({item}) => <SourceItem title={item.title} />
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <FlatList
      data={DATA}
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
