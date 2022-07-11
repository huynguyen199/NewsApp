import {StyleSheet, View} from "react-native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import SearchBar from "@components/searchBar"
import fonts from "@assets/fonts"
import {sizes} from "../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const SearchContainer = ({search, setSearch, setNews, duplicateNews}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onChangeSearch = (text) => {
    setSearch(text)
    let newsData = [...duplicateNews]
    newsData = newsData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    )

    setNews(newsData)
  }
  const onClearSearch = () => {
    setSearch("")
  }

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.searchBarStyle}
        placeholder="Search"
        placeholderTextColor={"grey"}
        value={search}
        onChangeText={onChangeSearch}
        hasClearButton
        onClearText={onClearSearch}
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
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    searchBarStyle: {
      color: "black",
      fontFamily: fonts.bold,
      fontSize: sizes.h3,
    },
    containerStyleSearch: {flex: 1, paddingHorizontal: 10},
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
