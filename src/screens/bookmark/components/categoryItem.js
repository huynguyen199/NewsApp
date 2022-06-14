import {StyleSheet, Text, TouchableOpacity, View} from "react-native"

import React from "react"
import fonts from "@assets/fonts"
import {shortString} from "@utils/method"
import {useTheme} from "@react-navigation/native"

const CategoryItem = ({
  item,
  selectCategoryId,
  setSelectCategoryId,
  clearArticle,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onToggleCategory = () => {
    setSelectCategoryId(item.id)
    clearArticle()
  }

  return (
    <TouchableOpacity onPress={onToggleCategory}>
      <View
        style={
          selectCategoryId === item.id
            ? styles.container
            : styles.containerOutline
        }>
        <Text
          style={
            selectCategoryId === item.id
              ? styles.txtTitle
              : styles.txtTitleOutline
          }>
          {shortString(item.name, 12)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {color: colors.white, fontFamily: fonts.bold},
    txtTitleOutline: {color: colors.lightRed, fontFamily: fonts.bold},
    container: {
      backgroundColor: colors.lightRed,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginLeft: 5,
      borderWidth: 2,
      borderColor: colors.lightRed,
    },
    containerOutline: {
      backgroundColor: colors.white,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginLeft: 5,
      borderWidth: 2,
      borderColor: colors.lightRed,
    },
  })
export default CategoryItem
