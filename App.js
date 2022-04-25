import React, {useState} from "react"
import {NavigationContainer} from "@react-navigation/native"
import Router from "./src/navigation/rootSwitch"
import {darkColor, lightColor} from "./src/common/color"
import {Appearance} from "react-native"

import {GoogleSignin} from "@react-native-google-signin/google-signin"

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId:
    "906709917089-qfr9f4880g1bvn9q7gv4ip1spfc90cin.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
})

const App = () => {
  const [colorScheme, setColorScheme] = useState("")

  Appearance.addChangeListener((mode) => {
    setColorScheme(mode.colorScheme)
  })

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? darkColor : lightColor}>
      <Router />
    </NavigationContainer>
  )
}

export default App
