import {StyleSheet, Text, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Dimensions} from "react-native"
import React from "react"
import {authStack} from "@common/navigator"
import fonts from "@assets/fonts"
import {sizes} from "../../../assets/fonts"

const {height} = Dimensions.get("window")

const WithoutAccountButton = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()
  const onMoveSignUp = () => {
    navigation.navigate(authStack.register)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        already have an account?{" "}
        <Text onPress={onMoveSignUp} style={styles.txtSignIn}>
          Sign up
        </Text>
      </Text>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtSignIn: {
      fontFamily: fonts.bold,
      color: colors.lightRed,
    },
    txtTitle: {
      fontFamily: fonts.regular,
      color: colors.black,
      fontSize: sizes.h3,
    },
    container: {
      marginTop: height / 20 - 30,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
  })
export default WithoutAccountButton
