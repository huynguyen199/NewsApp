import React, {useEffect, useState} from "react"
import {StyleSheet, View} from "react-native"
import {findUserById, updateUser} from "@services/user"
import {useNavigation, useTheme} from "@react-navigation/native"

import Button from "@components/button"
import Header from "@components/header"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import LeftComponent from "./components/source/leftComponent"
import SearchBar from "@components/searchBar"
import SourceList from "./components/source/sourceList"
import {getALlSources} from "@services/source"
import {mainStack} from "@common/navigator"
import useAuth from "@hooks/useAuth"

const Source = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()
  const [sources, setSources] = useState([])
  const [disabled, setDisabled] = useState(false)
  const {userInfo} = useAuth()
  const [categoryFilter, setCategoryFilter] = useState([])
  const [search, setSearch] = useState(null)

  useEffect(() => {
    fetchAllSources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const arr = sources.filter((element) => element.checked === true)
    setDisabled(arr.length === 0)
  }, [sources])

  const fetchAllSources = async () => {
    const result = await getALlSources()
    // add column in object list
    const arr = insertColumnObjectList(result)

    setSources(arr)
    setCategoryFilter(arr)
  }

  const handleCheckbox = (id) => {
    const data = [...sources]
    const index = data.findIndex((item) => item.id === id)
    const isChecked = data[index].checked
    data[index].checked = !isChecked
    setSources(data)
    // setCategoryFilter(data)
  }

  const insertColumnObjectList = (result) => {
    const arr = result.map((x) => Object.assign({}, x, {checked: false}))
    return arr
  }

  const onMoveTopic = () => {
    updateSources()
    navigation.navigate(mainStack.topic)
  }

  const updateSources = async () => {
    const arr = sources.filter((item) => item.checked === true)
    let data = []
    for (let i = 0; i < arr.length; i++) {
      const element = {id: arr[i].id}
      data.push(element)
    }
    const providerData = userInfo._user.providerData[0]
    const user = await findUserById(providerData.uid)
    updateUser(user.id, {source: data})
    // console.log(data)
  }

  const onSearchSources = (text) => {
    setSearch(text)
    const resultSearch = categoryFilter.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase())
    })

    setSources(resultSearch)
  }

  return (
    <View style={styles.container}>
      <Header
        leftComponent={<LeftComponent />}
        backgroundColor={colors.white}
      />
      <View style={styles.boxHeader}>
        <View style={styles.boxAlignHorizontal}>
          <SearchBar
            value={search}
            onChangeText={onSearchSources}
            placeholder={"Search"}
            rightComponent={
              <Icon
                // onPress={onGoBackHome}
                name={Ionicons.search}
                type="ionicon"
                color={colors.grey}
                size={24}
              />
            }
            containerStyle={styles.containerStyleSearch}
          />
        </View>
        <View style={styles.boxList}>
          <SourceList sources={sources} handleCheckbox={handleCheckbox} />
        </View>
      </View>
      <View style={styles.boxBottom}>
        <Button
          disabled={disabled}
          onPress={onMoveTopic}
          containerStyle={styles.containerButton}
          title="Next"
        />
      </View>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    boxList: {
      flex: 1,
      marginTop: 10,
      alignItems: "center",
    },
    containerButton: {marginHorizontal: 20},
    containerStyleSearch: {marginTop: 20},
    boxAlignHorizontal: {marginHorizontal: 10},
    boxBottom: {
      height: 5,
      flex: 0.15,
      justifyContent: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: colors.ghostWhite,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
    },
    boxHeader: {
      height: 20,
      flex: 0.9,
    },
    container: {flex: 1, backgroundColor: colors.white},
  })

export default Source
