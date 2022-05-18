import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import fonts from "@assets/fonts"
import {useNavigation, useTheme} from "@react-navigation/native"
import {Ionicons} from "@common/icon"
import {Icon} from "@rneui/themed"
import {findCategoryById} from "@services/category"
import {mainStack} from "@common/navigator"
import Lottie from "lottie-react-native"
import assets from "@assets"
import {findUserById} from "@services/user"
import {isEmpty} from "@utils/method"
import _ from "lodash"

const ArticleItem = ({item, showOptionsModal, setSelectedArticleId}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [source, setSource] = useState({})
  const [category, setCategory] = useState({})
  const navigation = useNavigation()
  const [isBookmark, setIsBookmark] = useState(false)
  const bookmarkRef = useRef(null)

  useEffect(() => {
    fetchUserById()
    fetchCategoryById()
    return () => {
      setSource({})
      setCategory({})
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const fetchUserById = async () => {
    const userData = await findUserById(item.userId)
    setSource(userData)
  }
  const fetchCategoryById = async () => {
    const categoryData = await findCategoryById(item.categoryId)
    setCategory(categoryData)
  }

  const onToggleBookmark = () => {
    setIsBookmark(!isBookmark)
    if (isBookmark) {
      bookmarkRef.current.play(20, 0)
    } else {
      bookmarkRef.current.play(0, 50)
    }
    // bookmarkRef.current.
  }

  const onMoveDetail = () => {
    navigation.navigate(mainStack.detail, {postId: item.id})
  }

  const onTouchOptions = () => {
    showOptionsModal()
    setSelectedArticleId(item.id)
  }

  return (
    <TouchableOpacity onPress={onMoveDetail}>
      <View style={styles.container}>
        <Image
          style={styles.imageLeft}
          source={{
            uri: item.urlToImage,
          }}
        />
        <View style={styles.boxRight}>
          <Text style={styles.txtTitle}>
            {item.title.length > 40
              ? item.title.substring(0, 40) + "..."
              : item.title}
          </Text>
          <View style={styles.boxLogo}>
            {_.isEmpty(source) && _.isEmpty(category) ? (
              <ActivityIndicator size={20} color={colors.lightRed} />
            ) : (
              <>
                <Image
                  style={styles.imageLogo}
                  source={{
                    uri: source.photoUrl,
                  }}
                />
                <Text style={styles.txtBrand}>
                  {source.fullName?.length > 5
                    ? source.fullName.substring(0, 5) + "..."
                    : source.fullName}
                </Text>
                <View style={styles.boxCategory}>
                  <Text style={styles.txtCategory}>{category.name}</Text>
                </View>
              </>
            )}
          </View>
          <View style={styles.boxBottom}>
            {/* <View style={{width: 50, height: 50}}> */}
            <TouchableOpacity onPress={onToggleBookmark}>
              <Lottie
                ref={bookmarkRef}
                style={styles.lottieStyle}
                // style={{backgroundColor: "red"}}
                source={assets.lottieFiles.bookmark}
                autoPlay={false}
                loop={false}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onTouchOptions}>
              <Icon
                name={Ionicons.ellipsisHorizontal}
                color={colors.lightRed}
                style={styles.optionIconStyle}
                type="ionicon"
                size={25}
              />
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    optionIconStyle: {
      marginRight: 5,
    },
    lottieStyle: {width: 50, height: 50},
    boxBottom: {
      position: "absolute",
      bottom: 0,
      right: -5,
      flexDirection: "row",
      alignItems: "center",
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
      alignSelf: "center",
      marginLeft: 5,
      fontFamily: fonts.bold,
      color: colors.black,
    },
    imageLogo: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
    },
    boxLogo: {
      backgroundColor: colors.white,
      flexDirection: "row",
      marginTop: 20,
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
