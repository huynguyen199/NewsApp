import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {Ionicons} from "../../../common/icon"
import {useTheme} from "@react-navigation/native"
import fonts from "../../../assets/fonts"
import SearchHistoryItem from "./searchHistoryItem"
import {storeObject} from "../../../utils/AsyncStore"

const SearchHistory = ({history, setHistory}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onClearHistory = () => {
    storeObject("history", [])
    setHistory([])
  }

  return (
    <View style={styles.container}>
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
      <ScrollView>
        <View style={styles.boxHistoryList}>
          {history.map((item, index) => (
            <SearchHistoryItem item={item} key={item + index} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxHistoryList: {
      backgroundColor: "white",
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
