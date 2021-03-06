import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Dimensions} from "react-native"
import FormLogin from "./components/formLogin"
import Header from "@components/header"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import SocialContainer from "./components/socialContainer"
import WithoutAccountButton from "./components/withoutAccountButton"
import fonts from "@assets/fonts"
import {mainStack} from "@common/navigator"
import {sizes} from "../../assets/fonts"

const {width} = Dimensions.get("window")
const Login = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onBackHome = () => {
    navigation.navigate(mainStack.homeTab)
  }

  return (
    <ScrollView style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity
            style={styles.touchableIconStyle}
            onPress={onBackHome}>
            <Icon
              // onPress={onGoBackHome}
              name={Ionicons.arrowBack}
              type="ionicon"
              color={colors.lightRed}
              size={36}
            />
          </TouchableOpacity>
        }
        backgroundColor={colors.white}
      />
      <View style={styles.boxContainer}>
        <View style={styles.boxLogo}>
          <Image
            style={styles.logoTop}
            source={{
              uri: "https://www.patentlyapple.com/.a/6a0120a5580826970c01b7c8b154b7970b-pi",
            }}
          />
          <Text style={styles.txtTitle}>Let&apos;s Sign You In</Text>
          {/*END create an account */}
        </View>
        <View style={styles.boxFormLogin}>
          <FormLogin />
          <Text style={styles.txtOr}>or continue with</Text>
          <SocialContainer />
          <WithoutAccountButton />
        </View>
      </View>
    </ScrollView>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    touchableIconStyle: {marginLeft: 5},
    boxFormLogin: {marginTop: 20},
    txtOr: {
      fontFamily: fonts.regular,
      textAlign: "center",
      color: colors.black,
      marginBottom: width / 18,
      marginTop: width / 18,
      fontSize: sizes.h3,
    },
    stylePasswordHelper: {marginTop: 5},
    styleEmailHelper: {marginTop: 5},
    txtTitle: {
      fontSize: sizes.h1,
      color: colors.black,
      marginTop: 40,
      fontFamily: fonts.bold,
    },
    logoTop: {width: 100, height: 100, marginTop: width / 10 - 40},
    styleLabel: {
      fontSize: 16,
      marginLeft: 10,
      fontFamily: fonts.bold,
    },
    boxLogo: {
      alignItems: "center",
      justifyContent: "center",
    },
    boxContainer: {
      marginHorizontal: 10,
    },
    container: {flex: 1, backgroundColor: colors.primary},
  })
export default Login
