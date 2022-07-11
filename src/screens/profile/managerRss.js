import {FlatList, StyleSheet, View} from "react-native"
import React, {useCallback, useState} from "react"
import {deleteLinkForUserByLink, findUserById} from "@services/user"
import {useFocusEffect, useTheme} from "@react-navigation/native"

import ArticleItem from "./components/managerRss/articleItem"
import ConfirmDialog from "@components/confirmDialog"
import Header from "@components/header"
import {Ionicons} from "@common/icon"
import LeftComponent from "./components/managerRss/leftComponent"
import Loading from "@components/loading"
import Toast from "react-native-toast-message"
import _ from "lodash"
import auth from "@react-native-firebase/auth"
import {fetchRss} from "@utils/handleRss"
import useDialog from "@hooks/useDialog"

const logoRss =
  "https://media.istockphoto.com/vectors/rss-icon-vector-vector-id923565258?k=20&m=923565258&s=612x612&w=0&h=_WQz621hWqGe6rmAnT4XTmhhEnBzyPw3h9bB2NcneF8="

const ManagerRss = () => {
  const [rssInfoList, setRssInfoList] = useState([])
  const [selectLinkItem, setSelectLinkItem] = useState(null)

  const {dialog, showConfirmDialog, hideConfirmDialog} = useDialog()
  const [loading, setLoading] = useState(true)
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const renderItem = ({item}) => (
    <ArticleItem
      item={item}
      showConfirmDialog={showConfirmDialog}
      setSelectLinkItem={setSelectLinkItem}
    />
  )

  useFocusEffect(
    useCallback(() => {
      fetchlinkList()
    }, []),
  )

  const fetchlinkList = async () => {
    const userId = await auth().currentUser.providerData[0].uid
    const user = await findUserById(userId)
    const data = []
    if (_.isEmpty(user)) {
      return setLoading(false)
    }
    const links = user.links

    if (_.isEmpty(links)) {
      return setLoading(false)
    }
    const listPromise = []

    for (const link of links) {
      listPromise.push(fetchRss(link))
    }
    Promise.all(listPromise).then((values) => {
      for (let i = 0; i < values.length; i++) {
        const rss = values[i]
        const source = {
          id: links[i],
          logo: rss.image.url ?? logoRss,
          title: rss.image.title ?? rss.title,
          domain: rss.links[0].url.split("/")[2],
          link: rss,
          category: rss.title,
        }

        data.push(source)
      }

      setRssInfoList(data)
    })

    setLoading(false)
  }
  const onAcceptDeleteLink = async () => {
    const userId = await auth().currentUser.providerData[0].uid
    const user = await findUserById(userId)

    let links = user.links
    const item = selectLinkItem
    links = links.filter((link) => link !== item.id)

    await deleteLinkForUserByLink(userId, links).then(() => {
      let resultRssInfo = rssInfoList.filter((link) => link.id !== item.id)
      setRssInfoList(resultRssInfo)
      hideConfirmDialog()
      Toast.show({
        type: "trashToast",
        text1: "deleted successfully",
        text2: Ionicons.delete,
        position: "bottom",
      })
    })
  }

  const onRejectDeleteLink = () => {
    hideConfirmDialog()
  }
  if (loading) {
    return (
      <>
        <Header leftComponent={<LeftComponent />} />
        <Loading />
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Header leftComponent={<LeftComponent />} />
      <FlatList
        data={rssInfoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <ConfirmDialog
        isVisible={dialog.isConfirm}
        title="Are you sure want to delete this news?"
        onAccept={onAcceptDeleteLink}
        onReject={onRejectDeleteLink}
      />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.primary},
  })

export default ManagerRss
