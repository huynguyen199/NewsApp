import {StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import IconButton from "@components/iconButton"
import {Ionicons} from "@common/icon"
import {useNavigation, useTheme} from "@react-navigation/native"
import {mainStack} from "@common/navigator"
import {getObject, storeObject} from "@utils/AsyncStore"

const RightComponent = ({search}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveSearchFound = async () => {
    navigation.navigate(mainStack.searchFound, {titleSearch: search})
    await saveHistory()
  }

  const saveHistory = async () => {
    const data = await getObject("history")
    data.push(search)
    storeObject("history", data)
  }

  return (
    <TouchableOpacity onPress={onMoveSearchFound} style={styles.container}>
      <IconButton name={Ionicons.search} style={styles.styleEllopsis} />
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    styleEllopsis: {marginLeft: 10},
    styleBookmark: {marginLeft: 10},
    container: {flexDirection: "row"},
  })

export default RightComponent
