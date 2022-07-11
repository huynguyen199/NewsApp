import {View, StyleSheet} from "react-native"
import React from "react"
import Header from "@components/header"
import LeftComponent from "./leftComponent"
import {useNavigation, useTheme} from "@react-navigation/native"
import Button from "@components/button"
import {rootSwitch} from "@common/navigator"

const WithoutAccount = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onMoveAuth = () => {
    navigation.navigate(rootSwitch.auth)
  }

  return (
    <>
      <Header
        containerStyle={styles.containerStyleHeader}
        leftComponent={<LeftComponent />}
        // rightComponent={<RightComponent />}
      />
      <View style={styles.container}>
        <Button
          onPress={onMoveAuth}
          title={"Login now / Register now"}
          containerStyle={styles.buttonContainerStyle}
          textStyle={styles.textButtonStyle}
        />
      </View>
    </>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    textButtonStyle: {
      color: colors.lightRed,
    },
    buttonContainerStyle: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lightRed,
    },
    container: {
      flex: 1,
      backgroundColor: colors.ghostWhite,
      justifyContent: "center",
      alignItems: "center",
    },
    containerStyleHeader: {marginTop: 10, backgroundColor: null},
  })

export default WithoutAccount
