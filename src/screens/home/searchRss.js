import * as rssParser from "react-native-rss-parser"

import {FlatList, StyleSheet, Text, View} from "react-native"
import React, {useEffect, useState} from "react"

import ArticleItem from "./components/searchRss/articleItem"
import Header from "@components/header"
import HelperText from "@components/helperText"
import LeftComponent from "./components/searchRss/leftComponent"
import LoadingDialog from "@components/loadingDialog"
import SuccessDialog from "@components/successDialog"
import fonts from "@assets/fonts"
import {regexLinkRss} from "@utils/regex"
import useDialog from "@hooks/useDialog"
import {useTheme} from "@react-navigation/native"

const logoRss =
  "https://media.istockphoto.com/vectors/rss-icon-vector-vector-id923565258?k=20&m=923565258&s=612x612&w=0&h=_WQz621hWqGe6rmAnT4XTmhhEnBzyPw3h9bB2NcneF8="

const SearchRss = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  const {
    dialog,
    showLoadingDialog,
    hideLoadingDialog,
    showSuccessDialog,
    hideSuccessDialog,
  } = useDialog()

  const renderItem = ({item}) => (
    <ArticleItem
      showLoadingDialog={showLoadingDialog}
      hideLoadingDialog={hideLoadingDialog}
      showSuccessDialog={showSuccessDialog}
      item={item}
      search={search}
    />
  )
  const isValidUrl = search.match(regexLinkRss)

  useEffect(() => {
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
          }
          setData([source])
        })
    } else {
      setData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  return (
    <View style={styles.container}>
      <Header
        leftComponent={<LeftComponent search={search} setSearch={setSearch} />}
        // rightComponent={<RightComponent search={search} />}
        containerStyle={styles.containerStyleHeader}
        backgroundColor={colors.white}
      />
      <HelperText
        title={"invalid domain"}
        isVisible={search.length > 0 && !isValidUrl}
      />
      <Text style={styles.txtTitle}>Top Feeds</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <LoadingDialog isVisible={dialog.isLoading} />
      <SuccessDialog
        isVisible={dialog.isSuccess}
        title={"added new article"}
        titleButton={"Back"}
        onPress={hideSuccessDialog}
      />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      marginHorizontal: 10,
      marginTop: 5,
      fontSize: 14,
      fontFamily: fonts.bold,
      color: colors.black,
    },
    container: {flex: 1, backgroundColor: colors.white},
  })

export default SearchRss
