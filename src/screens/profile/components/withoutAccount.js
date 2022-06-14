import {Divider, Icon} from "@rneui/themed"
import {ImageBackground, StyleSheet, Text, View} from "react-native"
import {authStack, rootSwitch} from "@common/navigator"
import {useNavigation, useTheme} from "@react-navigation/native"

import Button from "@components/button"
import {Ionicons} from "@common/icon"
import {Material} from "@common/icon"
import React from "react"
import fonts from "@assets/fonts"

const image = {
  uri: "https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png",
}
const WithoutAccount = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveSignIn = () => {
    navigation.navigate(rootSwitch.auth)
  }
  const onMoveSignUp = () => {
    navigation.navigate(rootSwitch.auth, {screen: authStack.register})
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxInfo}>
        <ImageBackground
          source={image}
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
        <View style={styles.boxBtnRow}>
          <Button
            containerStyle={styles.signInContainerStyle}
            title={"Sign In"}
            onPress={onMoveSignIn}
          />
          <Button
            containerStyle={styles.signUpContainerStyle}
            onPress={onMoveSignUp}
            textStyle={{color: colors.lightRed}}
            title={"Sign Up"}
          />
        </View>
      </View>
      {/* info  profile */}
      <View style={styles.boxRowProfile}>
        <View style={styles.leftProfile}>
          <View>
            <Text style={styles.txtNumberNews}>0</Text>
            <Text style={styles.txtNews}>news</Text>
          </View>
        </View>

        <View style={styles.boxCenter}>
          <Text style={styles.txtNumberFollower}>0</Text>
          <Text style={styles.txtFollower}>news</Text>
        </View>
        <View style={styles.boxRight}>
          <Text style={styles.txtNumOfFollowing}>0</Text>
          <Text style={styles.txtFollowing}>news</Text>
        </View>
      </View>
      <Divider style={styles.dividerStyle} />
      <Button
        title="Website"
        leftIcon={Ionicons.globe}
        containerStyle={styles.containerStyleButton}
        textStyle={{color: colors.lightRed}}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    dividerStyle: {marginTop: 20},
    signUpContainerStyle: {
      paddingHorizontal: 50,
      marginHorizontal: 5,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.lightRed,
    },
    signInContainerStyle: {
      paddingHorizontal: 50,
      marginHorizontal: 5,
      borderWidth: 2,
      borderColor: colors.lightRed,
    },
    boxBtnRow: {flexDirection: "row", marginTop: 30},
    container: {backgroundColor: colors.white, flex: 1},
    containerStyleButton: {
      marginTop: 40,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.red,
    },
    txtFollowing: {
      marginTop: 10,
      fontFamily: fonts.regular,
      color: "black",
    },
    txtNumOfFollowing: {
      fontFamily: fonts.bold,
      fontSize: 24,
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
      color: "black",
    },
    txtNumberFollower: {fontFamily: fonts.bold, fontSize: 24, color: "black"},
    boxCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRightWidth: 1,
      borderColor: colors.lightGrey,
    },
    txtNews: {marginTop: 10, fontFamily: fonts.regular},
    txtNumberNews: {fontFamily: fonts.bold, fontSize: 24, color: "black"},
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
      color: "black",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    imageChildStyle: {
      width: 20,
      height: 20,
      position: "absolute",
      bottom: 5,
      right: 5,
    },
    imageStyle: {borderRadius: 130 / 2},
    styleBackground: {width: 130, height: 130},
    boxInfo: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    boxMargin: {marginHorizontal: 5},
  })

export default WithoutAccount
