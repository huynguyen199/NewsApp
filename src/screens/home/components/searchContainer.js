import {StyleSheet, TouchableOpacity, View} from "react-native"
import React from "react"
import SearchBar from "@components/searchBar"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import {useNavigation, useTheme} from "@react-navigation/native"
import {mainStack} from "@common/navigator"

const SearchContainer = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveSearch = () => {
    navigation.navigate(mainStack.search)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMoveSearch} style={styles.touchSearchStyle}>
        <SearchBar
          editable={false}
          placeholder="Search"
          placeholderTextColor={"grey"}
          rightComponent={
            <Icon
              name={Ionicons.search}
              color={"black"}
              type="ionicon"
              solid={true}
              size={24}
            />
          }
          containerStyle={styles.containerStyleSearch}
        />
      </TouchableOpacity>
      <View style={styles.boxIcon}>
        <Icon
          name={Ionicons.filter}
          type="ionicon"
          color={colors.lightRed}
          size={20}
        />
      </View>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    touchSearchStyle: {flex: 1},
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
      marginHorizontal: 10,
      marginTop: 5,
    },
  })

export default SearchContainer
