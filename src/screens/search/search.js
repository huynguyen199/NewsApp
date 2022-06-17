import React, {useCallback, useState} from "react"
import {StatusBar, StyleSheet, View} from "react-native"
import {useFocusEffect, useTheme} from "@react-navigation/native"

import Header from "@components/header"
// import {Header} from "@rneui/themed"
import LeftComponent from "./components/leftComponent"
import SearchHistory from "./components/searchHistory"
import SearchList from "./components/searchList"
import {getObject} from "@utils/AsyncStore"

const Search = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [search, setSearch] = useState("")
  const [history, setHistory] = useState([])

  useFocusEffect(
    useCallback(() => {
      getSearchHistory()
    }, []),
  )

  const getSearchHistory = async () => {
    const data = (await getObject("history")) ?? []
    setHistory(data)
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} />
      <Header
        leftComponent={<LeftComponent search={search} setSearch={setSearch} />}
        // rightComponent={<RightComponent search={search} />}
        containerStyle={styles.containerStyleHeader}
        backgroundColor={colors.white}
      />

      {search.length > 0 ? (
        <SearchList search={search} />
      ) : (
        <SearchHistory setHistory={setHistory} history={history} />
      )}
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleHeader: {borderBottomWidth: 0, margin: 10},
    container: {flex: 1, backgroundColor: colors.white},
  })

export default Search
