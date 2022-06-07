import {StyleSheet, View} from "react-native"

import React from "react"
import TagItem from "./tagItem"
import {useTheme} from "@react-navigation/native"

const TagList = ({tags}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      {tags.map((tag) => (
        <TagItem key={tag} title={tag} />
      ))}
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    container: {flexDirection: "row", marginBottom: 20},
  })

export default TagList
