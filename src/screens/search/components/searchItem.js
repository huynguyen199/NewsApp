import {StyleSheet, TouchableOpacity} from "react-native"
import {getObject, storeObject} from "@utils/AsyncStore"
import {useNavigation, useTheme} from "@react-navigation/native"

import Highlighter from "react-native-highlight-words"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import {mainStack} from "@common/navigator"
import {sizes} from "../../../assets/fonts"

const SearchItem = ({search, item}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveSearchFound = async () => {
    navigation.navigate(mainStack.searchFound, {titleSearch: item.title})
    saveHistory()
  }

  const saveHistory = async () => {
    let data = (await getObject("history")) ?? []
    data = data.filter((history) => history !== item.title)
    data.unshift(item.title)
    storeObject("history", data)
  }

  return (
    <TouchableOpacity onPress={onMoveSearchFound} style={styles.container}>
      <Highlighter
        highlightStyle={styles.txtHightlight}
        searchWords={[search]}
        style={styles.hightlightStyle}
        textToHighlight={item.title}
      />
      <Icon
        name={Ionicons.trendingUp}
        type="ionicon"
        color={colors.black}
        solid={true}
        style={styles.iconStyle}
        size={20}
      />
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    iconStyle: {marginRight: 10},
    hightlightStyle: {
      color: colors.black,
      width: "90%",
      fontSize: sizes.h3,
    },
    txtHightlight: {fontWeight: "bold", fontSize: sizes.h3},
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomWidth: 1,
      borderColor: colors.whiteSmoke,
    },
  })

export default SearchItem
