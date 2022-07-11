import {Divider, Icon} from "@rneui/themed"
import {ImageBackground, Linking, StyleSheet, Text, View} from "react-native"
import React, {useCallback, useState} from "react"
import {useFocusEffect, useTheme} from "@react-navigation/native"

import Button from "@components/button"
import Header from "@components/header"
import {Ionicons} from "@common/icon"
import LeftComponent from "./components/leftComponent"
import Loading from "./components/loading"
import {Material} from "@common/icon"
import RightComponent from "./components/rightComponent"
import WithoutAccount from "./components/withoutAccount"
import {findPostByUserId} from "@services/post"
import {findUserById} from "@services/user"
import fonts from "@assets/fonts"
import {sizes} from "../../assets/fonts"
import useAuth from "@hooks/useAuth"

const Profile = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const [profile, setProfile] = useState({})
  const [countPost, setCountPost] = useState(0)
  const [loading, setLoading] = useState(true)
  const {userInfo} = useAuth()

  useFocusEffect(
    useCallback(() => {
      fetchUser()
      fetchCountPost()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]),
  )

  const fetchCountPost = async () => {
    // const userId = profile.id
    // const user = await findUserById(userId)
    if (userInfo) {
      const providerData = userInfo._user.providerData[0]
      const user = await findUserById(providerData.uid)
      const post = await findPostByUserId(user.id)
      setCountPost(post.length)
    }
  }

  const fetchUser = async () => {
    if (userInfo) {
      const providerData = userInfo._user.providerData[0]
      const user = await findUserById(providerData.uid)
      setLoading(false)
      setProfile(user)
    }
  }

  const onOpenWebsite = async () => {
    const url = profile.website

    if (!url) return

    await Linking.openURL(url)
  }

  if (userInfo === null) {
    return <WithoutAccount />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxMargin}>
        <Header
          containerStyle={styles.containerStyleHeader}
          leftComponent={<LeftComponent />}
          rightComponent={<RightComponent />}
        />
        <View style={styles.boxInfo}>
          <ImageBackground
            source={{
              uri:
                profile?.photoUrl ??
                "https://espclarity.com/wp-content/uploads/2021/07/3rd-member.png",
            }}
            imageStyle={styles.imageStyle}
            style={styles.styleBackground}>
            <View style={styles.imageChildStyle}>
              <Icon
                reverse
                name={Material.edit}
                type="material"
                size={12}
                color={colors.lightRed}
              />
            </View>
          </ImageBackground>
          <Text style={styles.txtTitle}>{profile?.fullName ?? ""}</Text>
          <Text style={styles.styleContent}>{profile?.about ?? ""}</Text>
        </View>
        <View style={styles.boxRowProfile}>
          <View style={styles.leftProfile}>
            <Text style={styles.txtNumberNews}>{countPost}</Text>
            <Text style={styles.txtNews}>news</Text>
          </View>

          <View style={styles.boxCenter}>
            <Text style={styles.txtNumberFollower}>0</Text>
            <Text style={styles.txtFollower}>Follower</Text>
          </View>
          <View style={styles.boxRight}>
            <Text style={styles.txtNumOfFollowing}>0</Text>
            <Text style={styles.txtFollowing}>Follwing</Text>
          </View>
        </View>
        <Divider style={styles.styleDivider} />
        <Button
          onPress={onOpenWebsite}
          title="Website"
          leftIcon={Ionicons.globe}
          containerStyle={styles.containerStyleButton}
          textStyle={{color: colors.lightRed, fontSize: sizes.h2}}
        />
      </View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    styleDivider: {marginTop: 20},
    containerStyleHeader: {marginTop: 10},
    containerStyleButton: {
      marginTop: 40,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.red,
    },
    txtFollowing: {
      marginTop: 10,
      fontFamily: fonts.regular,
      color: colors.black,
    },
    txtNumOfFollowing: {
      fontFamily: fonts.bold,
      fontSize: sizes.h1,
      color: colors.black,
    },
    boxRight: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    txtFollower: {
      marginTop: 10,
      fontFamily: fonts.regular,
      color: colors.black,
    },
    txtNumberFollower: {
      fontFamily: fonts.bold,
      color: colors.black,
      fontSize: sizes.h1,
    },
    boxCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRightWidth: 1,
      borderColor: colors.lightGrey,
    },
    txtNews: {marginTop: 10, fontFamily: fonts.regular, color: colors.black},
    txtNumberNews: {
      fontFamily: fonts.bold,
      fontSize: sizes.h1,
      color: colors.black,
    },
    leftProfile: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRightWidth: 1,
      borderColor: colors.lightGrey,
    },
    boxRowProfile: {
      flexDirection: "row",
      marginHorizontal: 10,
      padding: 10,
      marginTop: 10,
    },
    styleContent: {
      textAlign: "center",
      marginTop: 10,
      fontFamily: fonts.regular,
    },
    txtTitle: {
      color: colors.black,
      fontFamily: fonts.bold,
      fontSize: sizes.h1,
      marginTop: 20,
    },
    imageChildStyle: {
      width: 20,
      height: 20,
      position: "absolute",
      bottom: 10,
      right: 10,
    },
    imageStyle: {borderRadius: 130 / 2},
    styleBackground: {width: 130, height: 130},
    boxInfo: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    boxMargin: {marginHorizontal: 5},
    container: {flex: 1, backgroundColor: colors.white},
  })

export default Profile
