import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useNavigation, useTheme} from "@react-navigation/native"
import {Dimensions} from "react-native"
import {authStack} from "@common/navigator"
import fonts from "@assets/fonts"

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
    },
    container: {
      marginTop: height / 20 - 20,
      justifyContent: "center",
      alignItems: "center",
    },
  })
export default WithoutAccountButton
