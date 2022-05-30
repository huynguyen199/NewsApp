import React, {useState} from "react"
import {NavigationContainer, useTheme} from "@react-navigation/native"
import Router from "./src/navigation/rootSwitch"
import {darkColor, lightColor} from "./src/common/color"
import {Appearance, StatusBar} from "react-native"
import {GoogleSignin} from "@react-native-google-signin/google-signin"
import {HomeContext} from "./src/context/home"
GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId:
    "906709917089-qfr9f4880g1bvn9q7gv4ip1spfc90cin.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
})
import Toast from "react-native-toast-message"
import {toastConfig} from "./src/utils/toastConfig"

const App = () => {
  const [colorScheme, setColorScheme] = useState("")
  const [darkScheme, setDarkScheme] = useState(false)
  const {colors} = useTheme()
  const [selectCategoryId, setSelectCategoryId] = useState("all")

  Appearance.addChangeListener((mode) => {
    setColorScheme(mode.colorScheme)
  })

  return (
    <>
      <NavigationContainer
        theme={darkScheme || colorScheme === "dark" ? darkColor : lightColor}>
        <HomeContext.Provider
          value={{
            selectCategoryId,
            setSelectCategoryId,
            darkScheme,
            setDarkScheme,
          }}>
          <StatusBar animated={true} backgroundColor={colors.white} />
          <Router />
        </HomeContext.Provider>
      </NavigationContainer>
      <Toast config={toastConfig} visibilityTime={1000} />
    </>
  )
}

export default App
