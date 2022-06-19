import * as rssParser from "react-native-rss-parser"

import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import SearchBar from "@components/searchBar"
import fonts from "@assets/fonts"

const {width} = Dimensions.get("window")
const logoRss =
  "https://media.istockphoto.com/vectors/rss-icon-vector-vector-id923565258?k=20&m=923565258&s=612x612&w=0&h=_WQz621hWqGe6rmAnT4XTmhhEnBzyPw3h9bB2NcneF8="

const LeftComponent = ({search, setSearch, isValidUrl, setData}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onBackHome = () => {
    navigation.goBack()
  }
  const onChangeSearch = (text) => {
    setSearch(text)
  }

  const onSubmitText = async () => {
    if (isValidUrl) {
      fetch(search)
        .then((response) => response.text())
        .then((responseData) => rssParser.parse(responseData))
        .then(async (rss) => {
          const source = {
            logo: rss.image.url ?? logoRss,
            title: rss.image.title ?? rss.title,
            domain: rss.links[0].url.split("/")[2],
            link: search,
            category: rss.title,
            id: "testid",
          }
          setData([source])
        })
    } else {
      setData([])
    }
  }

  const onClearSearch = () => {
    setSearch("")
    setData([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxRow}>
        <TouchableOpacity onPress={onBackHome}>
          <Icon
            name={Ionicons.back}
            type="ionicon"
            color={colors.lightRed}
            size={30}
          />
        </TouchableOpacity>
        <SearchBar
          value={search}
          onClearText={onClearSearch}
          hasClearButton
          containerStyleClear={styles.containerStyleClear}
          rightComponent={
            <Icon
              name={Ionicons.search}
              type="ionicon"
              solid={true}
              size={20}
            />
          }
          style={styles.searchStyle}
          // autoFocus={rtrue}
          onSubmitEditing={onSubmitText}
          onChangeText={onChangeSearch}
          containerStyle={styles.searchContainerStyle}
          placeholder="Enter your url RSS here"
          placeholderTextColor="grey"
        />
      </View>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleClear: {marginRight: 10},
    searchStyle: {
      color: "black",
      fontFamily: fonts.bold,
      paddingHorizontal: 10,
    },
    searchContainerStyle: {width: width / 1.2, marginLeft: 10},
    boxRow: {flexDirection: "row", height: 46, alignItems: "center"},
    container: {
      alignItems: "center",
      height: 40,
      justifyContent: "center",
      marginLeft: 10,
    },
  })

export default LeftComponent
