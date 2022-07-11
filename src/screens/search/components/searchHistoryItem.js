import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {getObject, storeObject} from "@utils/AsyncStore"
import {useNavigation, useTheme} from "@react-navigation/native"

import React from "react"
import fonts from "@assets/fonts"
import {mainStack} from "@common/navigator"
import {sizes} from "../../../assets/fonts"

const SearchHistoryItem = ({item}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveSearchFound = () => {
    navigation.navigate(mainStack.searchFound, {titleSearch: item})
    saveHistory()
  }
  const saveHistory = async () => {
    let data = (await getObject("history")) ?? []
    data = data.filter((history) => history !== item)

    data.unshift(item)
    storeObject("history", data)
  }

  return (
    <TouchableOpacity onPress={onMoveSearchFound}>
      <View style={styles.container}>
        <Text style={styles.txtTitle}>{item}</Text>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {color: "black", fontFamily: fonts.regular, fontSize: sizes.h3},
    container: {
      backgroundColor: colors.whiteSmoke,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      marginRight: 10,
      marginTop: 10,
    },
  })

export default SearchHistoryItem
