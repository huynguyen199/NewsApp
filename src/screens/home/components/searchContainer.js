import {StyleSheet, TouchableOpacity, View} from "react-native"
import React from "react"
import SearchBar from "@components/searchBar"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import {useNavigation, useTheme} from "@react-navigation/native"
import {mainStack} from "../../../common/navigator"

const SearchContainer = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveSearch = () => {
    navigation.navigate(mainStack.search)
  }

  return (
    <TouchableOpacity onPress={onMoveSearch} style={styles.container}>
      <SearchBar
        editable={false}
        placeholder="Search"
        containerStyle={styles.containerStyleSearch}
      />
      <View style={styles.boxIcon}>
        <Icon
          name={Ionicons.filter}
          type="ionicon"
          color={colors.lightRed}
          size={20}
        />
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleSearch: {flex: 1},
    boxIcon: {
      backgroundColor: "rgba(252, 50, 50, 0.09)",
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 10,
      marginLeft: 10,
    },
    container: {
      flexDirection: "row",
      // width: "100%",
      alignItems: "center",
      marginTop: 10,
      marginHorizontal: 10,
    },
  })

export default SearchContainer
