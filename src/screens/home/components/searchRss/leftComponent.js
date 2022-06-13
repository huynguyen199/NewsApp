import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native"
import {getObject, storeObject} from "@utils/AsyncStore"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import SearchBar from "@components/searchBar"
import fonts from "@assets/fonts"
import {mainStack} from "@common/navigator"

const {width} = Dimensions.get("window")

const LeftComponent = ({search, setSearch}) => {
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
    navigation.navigate(mainStack.searchFound, {titleSearch: search})
    await saveHistory()
  }

  const saveHistory = async () => {
    let data = (await getObject("history")) ?? []
    data = data.filter((history) => history !== search)
    data.unshift(search)
    storeObject("history", data)
  }

  const onClearSearch = () => {
    setSearch("")
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
          placeholder="Enter your url here"
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
