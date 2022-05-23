import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import React, {useContext} from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"
import {HomeContext} from "@context/home"

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
          {item.name}
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
