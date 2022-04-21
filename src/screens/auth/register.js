import {View, Image, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import {Header, Icon} from "@rneui/themed"
import SocialContainer from "./components/socialContainer"
import WithoutAccountButton from "./components/withoutAccountButton"
import FormRegister from "./components/register/formRegister"
import {Dimensions} from "react-native"

const {width, height} = Dimensions.get("window")
const Register = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Header
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
          <Text style={styles.txtTitle}>Create an Account</Text>
          {/*END create an account */}
        </View>
        <View style={styles.boxFormLogin}>
          <FormRegister />
          <Text style={styles.txtOr}>or continue with</Text>
          <SocialContainer />
        </View>
        <WithoutAccountButton />
      </View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxFormLogin: {marginTop: 30},
    txtOr: {
      fontFamily: "SourceSansPro-Regular",
      textAlign: "center",
      color: colors.black,
      marginBottom: width / 18,
      marginTop: width / 18,
    },
    stylePasswordHelper: {marginTop: 5},
    styleEmailHelper: {marginTop: 5},
    txtTitle: {
      fontSize: 24,
      color: "black",
      marginTop: width / 10 - 10,
      fontFamily: "SourceSansPro-Bold",
    },
    logoTop: {width: 100, height: 100, marginTop: width / 10 - 40},
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
export default Register
