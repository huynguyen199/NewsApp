import React, {useEffect, useState} from "react"
import {StyleSheet, View} from "react-native"
import {findUserById, updateUser} from "@services/user"
import {useNavigation, useTheme} from "@react-navigation/native"

import Button from "@components/button"
import Header from "@components/header"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import LeftComponent from "./components/topic/leftComponent"
import SearchBar from "@components/searchBar"
import TopicList from "./components/topic/topicList"
//services
import {getALlCategory} from "@services/category"
import {mainStack} from "@common/navigator"
import useAuth from "@hooks/useAuth"

const Topic = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [category, setCategory] = useState([])
  const [categoryFilter, setCategoryFilter] = useState([])
  const [search, setSearch] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const {userInfo} = useAuth()
  const navigation = useNavigation()

  useEffect(() => {
    fetchCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const arr = category.filter((element) => element.checked === true)
    setDisabled(arr.length === 0)
  }, [category])

  const handleCheckbox = (id) => {
    const data = [...category]
    const index = data.findIndex((item) => item.id === id)
    const isChecked = data[index].checked
    data[index].checked = !isChecked
    setCategory(data)
    // setCategoryFilter(data)
  }

  const fetchCategory = async () => {
    const result = await getALlCategory()

    // add column in object list
    const arr = insertColumnObjectList(result)

    setCategory(arr)
    setCategoryFilter(arr)
  }

  const insertColumnObjectList = (result) => {
    const arr = result.map((x) => Object.assign({}, x, {checked: false}))
    return arr
  }

  const onMoveHome = () => {
    updateTopic()
    navigation.navigate(mainStack.homeTab)
  }

  const updateTopic = async () => {
    const arr = category.filter((item) => item.checked === true)
    let data = []
    for (let i = 0; i < arr.length; i++) {
      const element = {id: arr[i].id}
      data.push(element)
    }
    const providerData = userInfo._user.providerData[0]
    const user = await findUserById(providerData.uid)
    updateUser(user.id, {interest: data})
  }

  const onSearchTopic = (text) => {
    setSearch(text)
    const resultSearch = categoryFilter.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase())
    })

    setCategory(resultSearch)
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
            placeholder={"Search"}
            value={search}
            onChangeText={onSearchTopic}
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
        <View style={styles.containerTop}>
          <TopicList category={category} handleCheckbox={handleCheckbox} />
        </View>
      </View>
      <View style={styles.boxBottom}>
        <Button
          onPress={onMoveHome}
          disabled={disabled}
          containerStyle={styles.containerStyleBtn}
          title="Next"
        />
      </View>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    containerTop: {flex: 1, marginTop: 10, alignItems: "center"},
    containerStyleBtn: {marginHorizontal: 20},
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

export default Topic
