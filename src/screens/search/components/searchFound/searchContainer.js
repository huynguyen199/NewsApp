import {StyleSheet, TouchableOpacity, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import SearchBar from "@components/searchBar"
import {mainStack} from "@common/navigator"
import {sizes} from "../../../../assets/fonts"

const SearchContainer = ({titleSearch}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveSearch = () => {
    navigation.navigate(mainStack.search, {titleSearch})
  }

  return (
    <TouchableOpacity onPress={onMoveSearch} style={styles.container}>
      <SearchBar
        value={titleSearch}
        editable={false}
        style={styles.searchStyle}
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
    searchStyle: {color: "black", fontSize: sizes.h3},
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
