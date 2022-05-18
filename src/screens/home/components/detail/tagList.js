import {View, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import TagItem from "./tagItem"

const TagList = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <TagItem />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    container: {flexDirection: "row", marginTop: 20},
  })

export default TagList
