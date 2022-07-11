import {StyleSheet, Text, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import Button from "@components/button"
import Header from "@components/header"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import LeftComponent from "./leftComponent"
import React from "react"
import fonts from "@assets/fonts"
import {rootSwitch} from "@common/navigator"
import {sizes} from "../../../assets/fonts"

const WithoutAccount = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveHome = () => {
    navigation.navigate(rootSwitch.auth)
  }

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.containerStyleHeader}
        leftComponent={<LeftComponent />}
      />
      <View style={styles.containerTop}>
        <View style={styles.boxIcon}>
          <Icon
            name={Ionicons.person}
            type="ionicon"
            color={colors.white}
            solid={true}
            size={80}
          />
        </View>
        <Text style={styles.txtTitle}>You are not logged in</Text>
      </View>
      <Button
        onPress={onMoveHome}
        textStyle={styles.textStyleSignin}
        containerStyle={styles.signInContainerStyle}
        title="Sign in Now"
      />
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    textStyleSignin: {fontSize: sizes.h2},
    signInContainerStyle: {
      margin: 20,
    },
    txtTitle: {
      fontFamily: fonts.bold,
      color: colors.lightRed,
      fontSize: sizes.h1,
      marginTop: 30,
    },
    boxIcon: {
      backgroundColor: colors.lightRed,
      borderRadius: 200 / 2,
      padding: 30,
    },
    containerTop: {
      flex: 1,
      // backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    containerStyleHeader: {marginTop: 10, backgroundColor: null},
  })

export default WithoutAccount
