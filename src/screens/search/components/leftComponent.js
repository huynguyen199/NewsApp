import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import {useNavigation, useTheme} from "@react-navigation/native"
import SearchBar from "@components/searchBar"
import {mainStack} from "@common/navigator"
import {getObject, storeObject} from "@utils/AsyncStore"

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

  return (
    <TouchableOpacity onPress={onBackHome} style={styles.container}>
      <View style={styles.boxRow}>
        <Icon
          name={Ionicons.back}
          type="ionicon"
          color={colors.lightRed}
          size={30}
        />
        <SearchBar
          value={search}
          autoFocus
          onSubmitEditing={onSubmitText}
          onChangeText={onChangeSearch}
          containerStyle={styles.searchContainerStyle}
          placeholder="Search"
        />
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    searchContainerStyle: {width: width / 1.4, marginLeft: 10},
    boxRow: {flexDirection: "row", height: 46, alignItems: "center"},
    container: {
      alignItems: "center",
      height: 40,
      justifyContent: "center",
    },
  })

export default LeftComponent
