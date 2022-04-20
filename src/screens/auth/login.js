import {View, Image, Text, StyleSheet} from "react-native"
import React from "react"
import Input from "../../components/input"
import HelperText from "../../components/helperText"
import Label from "./components/label"

const Login = () => {
  return (
    <View style={styles.container}>
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
        <View>
          <Label title={"Email"} />
          <Input placeholder={"Enter your email"} />

          <HelperText style={styles.styleEmailHelper} />
          <Label title={"Password"} />

          <Input placeholder={"Enter your password"} />
          <HelperText style={styles.stylePasswordHelper} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  stylePasswordHelper: {marginTop: 5},
  styleEmailHelper: {marginTop: 5},
  txtTitle: {
    fontSize: 24,
    color: "black",
    marginTop: 40,
    fontFamily: "SourceSansPro-Bold",
  },
  logoTop: {width: 100, height: 100, marginTop: 60},
  styleLabel: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "SourceSansPro-Bold",
  },
  boxLogo: {
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  boxContainer: {
    marginHorizontal: 10,
  },
  container: {flex: 1},
})
export default Login
