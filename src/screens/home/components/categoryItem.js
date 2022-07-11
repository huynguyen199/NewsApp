import React, {useContext} from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"

import {HomeContext} from "@context/home"
import fonts from "@assets/fonts"
import {sizes} from "../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const CategoryItem = ({item, setArticle, setLastDocument}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const {selectCategoryId, setSelectCategoryId} = useContext(HomeContext)

  const onToggleCategory = () => {
    setSelectCategoryId(item.id)
    setArticle([])
    setLastDocument()
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
          {item.name.length > 12
            ? item.name.substring(0, 12) + "..."
            : item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {color: colors.white, fontFamily: fonts.bold, fontSize: sizes.h3},
    txtTitleOutline: {
      color: colors.lightRed,
      fontFamily: fonts.bold,
      fontSize: sizes.h3,
    },
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
