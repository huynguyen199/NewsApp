import {FlatList, StyleSheet, Text, View} from "react-native"
import React, {useState} from "react"

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

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <LeftComponent
            isValidUrl={isValidUrl}
            setData={setData}
            search={search}
            setSearch={setSearch}
          />
        }
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
        title={"Added new article"}
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
