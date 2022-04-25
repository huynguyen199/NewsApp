import {View, StyleSheet} from "react-native"
import React from "react"

import {AccessToken, LoginManager} from "react-native-fbsdk-next"
import {GoogleSignin} from "@react-native-google-signin/google-signin"
import {useTheme} from "@react-navigation/native"
import auth from "@react-native-firebase/auth"
import SocicalButton from "@components/socicalButton.js/index.js"
import Toast from "@common/toast.js"

const SocialContainer = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        Toast.show("login with facebook successful")
      })
  }

  async function onFacebookButtonPress() {
    // auth().signOut()
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ])

    if (result.isCancelled) {
      throw "User cancelled the login process"
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken()

    if (!data) {
      throw "Something went wrong obtaining access token"
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    )

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(facebookCredential)
      .then(() => {
        Toast.show("login with facebook successful")
      })
  }

  return (
    <View style={styles.container}>
      <SocicalButton
        onPress={() => onFacebookButtonPress}
        uri={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/800px-Facebook_f_logo_%282019%29.svg.png"
        }
        containerStyle={styles.containerStyleFb}
      />
      <SocicalButton
        onPress={onGoogleButtonPress}
        uri={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
        }
        containerStyle={styles.containerStyleGg}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyleGg: {marginLeft: 10},
    containerStyleFb: {marginRight: 10},
    container: {
      flexDirection: "row",
    },
  })

export default SocialContainer
