import {View, Image, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import {Header, Icon} from "@rneui/themed"
import FormLogin from "./components/formLogin"
import SocialContainer from "./components/socialContainer"
import WithoutAccountButton from "./components/withoutAccountButton"

const Login = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Header
        containerStyle={{}}
        leftComponent={
          <Icon
            // onPress={onGoBackHome}
            name={"arrow-back-outline"}
            type="ionicon"
            color="rgba(253,64,94,255)"
            size={36}
          />
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
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxFormLogin: {marginTop: 20},
    txtOr: {
      fontFamily: "SourceSansPro-Regular",
      textAlign: "center",
      color: colors.black,
      marginVertical: 40,
    },
    stylePasswordHelper: {marginTop: 5},
    styleEmailHelper: {marginTop: 5},
    txtTitle: {
      fontSize: 24,
      color: "black",
      marginTop: 40,
      fontFamily: "SourceSansPro-Bold",
    },
    logoTop: {width: 100, height: 100, marginTop: 20},
    styleLabel: {
      fontSize: 16,
      marginLeft: 10,
      fontFamily: "SourceSansPro-Bold",
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
