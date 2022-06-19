import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useEffect, useState} from "react"
import {
  addArticleWithUser,
  getAricleRssToday,
} from "../../../../utils/handleArticleRss"
import {
  addCategory,
  checkCategoryExist,
  findCategoryIdByLink,
} from "@services/category"
import {addLinksForUser, checkLinkExistsUser} from "@services/user"
import {
  addSource,
  checkSourceExistsByName,
  findSourceIdByName,
} from "@services/source"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const logoRss =
  "https://media.istockphoto.com/vectors/rss-icon-vector-vector-id923565258?k=20&m=923565258&s=612x612&w=0&h=_WQz621hWqGe6rmAnT4XTmhhEnBzyPw3h9bB2NcneF8="

const ArticleItem = ({
  item,
  search,
  showLoadingDialog,
  hideLoadingDialog,
  showSuccessDialog,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [isChecked, setIsChecked] = useState(false)

  const onTouchOptions = async () => {
    showLoadingDialog()
    if (auth().currentUser) {
      const {res, items} = await getAricleRssToday(search)
      const dataOfRss = res

      const name = dataOfRss.image.title ?? dataOfRss.title
      const categoryName = dataOfRss.title
      const logo = dataOfRss.image.url ?? logoRss
      const isSourceExist = await checkSourceExistsByName(name)
      const isExistCategory = await checkCategoryExist(categoryName)

      if (isSourceExist === false) {
        const data = {
          image: logo,
          name: name,
        }
        await addSource(data)
      }
      if (isExistCategory === false) {
        const data = {
          name: categoryName,
          image: logo,
          url: search,
        }
        await addCategory(data)
      }

      const userId = await auth().currentUser.providerData[0].uid
      const link = item.link
      const isLinkExist = await checkLinkExistsUser(userId, link)
      if (isLinkExist === false) {
        await addLinksForUser(userId, link)
          .then(async () => {
            const categoryId = await findCategoryIdByLink(item.link)
            const sourceId = await findSourceIdByName(item.title)
            addArticleWithUser(items, categoryId, sourceId, userId, dataOfRss)
            // await addNewArticle(item.link, categoryId, sourceId, userId)
            hideLoadingDialog()
          })
          .then(() => {
            showSuccessDialog()
          })
      }
    }
  }

  useEffect(() => {
    const checkLinksExistsUser = async () => {
      if (auth().currentUser) {
        const userId = await auth().currentUser.providerData[0].uid
        firestore()
          .collection("user")
          .where("id", "==", userId)
          .where("links", "array-contains", search)
          .onSnapshot((snapshot) => {
            setIsChecked(snapshot.docs.length > 0)
          })
      }
    }

    checkLinksExistsUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image
          style={styles.imageLeft}
          source={{
            uri: item.logo,
          }}
        />
        <View style={styles.boxRight}>
          <Text style={styles.txtTitle}>
            {item.title.length > 20
              ? item.title.substring(0, 20) + "..."
              : item.title}
          </Text>
          <View style={styles.boxLogo}>
            <Text style={styles.txtCateogryTitle}>{item.category}</Text>
            <Text style={styles.txtBrand}>{item.domain}</Text>
            <View style={styles.boxLogoRss}>
              <Icon
                name={Ionicons.logoRss}
                type="ionicon"
                size={30}
                color={colors.white}
              />
            </View>
          </View>
          <View style={styles.boxBottom}>
            {isChecked ? (
              <Icon
                name={Ionicons.checkMarkCircle}
                color={colors.lightRed}
                style={styles.optionIconStyle}
                type="ionicon"
                size={25}
              />
            ) : (
              <TouchableOpacity onPress={onTouchOptions}>
                <Icon
                  name={Ionicons.addOutline}
                  color={colors.lightRed}
                  style={styles.optionIconStyle}
                  type="ionicon"
                  size={25}
                />
              </TouchableOpacity>
            )}
            {/* </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    boxLogoRss: {
      backgroundColor: "orange",
      padding: 2,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.whiteSmoke,
      marginTop: 10,
    },
    optionIconStyle: {
      marginRight: 5,
    },
    lottieStyle: {width: 50, height: 50},
    boxBottom: {
      alignItems: "flex-end",
    },
    txtCategory: {
      color: colors.lightRed,
      fontFamily: fonts.bold,
    },
    boxCategory: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      borderRadius: 20,
      marginLeft: 5,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lightRed,
    },
    txtBrand: {
      fontFamily: fonts.regular,
      marginTop: 10,
    },
    txtCateogryTitle: {
      fontFamily: fonts.regular,
    },
    imageLogo: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
    },
    boxLogo: {
      backgroundColor: colors.white,
      marginTop: 10,
      alignItems: "flex-start",
    },
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: 18,
      color: colors.black,
    },
    boxRight: {
      margin: 10,
      width: 200,
    },
    imageLeft: {
      width: 150,
      height: 150,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    },
    container: {
      backgroundColor: colors.white,
      margin: 10,
      flexDirection: "row",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.whiteSmoke,
    },
  })

export default ArticleItem
