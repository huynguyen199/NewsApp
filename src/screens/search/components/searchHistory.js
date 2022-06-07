import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import SearchHistoryItem from "./searchHistoryItem"
import fonts from "@assets/fonts"
import {storeObject} from "@utils/AsyncStore"
import {useTheme} from "@react-navigation/native"

const SearchHistory = ({history, setHistory}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onClearHistory = () => {
    storeObject("history", [])
    setHistory([])
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.boxSpaceBetween}>
        <Text style={styles.txtTitle}>Search History</Text>
        <TouchableOpacity onPress={onClearHistory}>
          <Icon
            name={Ionicons.delete}
            type="ionicon"
            color={colors.lightRed}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.boxHistoryList}>
        {history.map((item, index) => (
          <SearchHistoryItem item={item} key={item + index} />
        ))}
      </View>
    </ScrollView>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxHistoryList: {
      backgroundColor: colors.white,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    txtTitle: {color: colors.black, fontFamily: fonts.bold, fontSize: 18},
    boxSpaceBetween: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
    },
    container: {marginHorizontal: 10},
  })
export default SearchHistory
