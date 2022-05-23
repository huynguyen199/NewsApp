import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useNavigation, useTheme} from "@react-navigation/native"
import fonts from "../../../assets/fonts"
import {mainStack} from "../../../common/navigator"
import {getObject, storeObject} from "../../../utils/AsyncStore"

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
    // console.log("data", data)
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
    txtTitle: {color: colors.black, fontFamily: fonts.regular},
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
