import React, {useState} from "react"
import {NavigationContainer} from "@react-navigation/native"
import Router from "./src/navigation/rootSwitch"
import {darkColor, lightColor} from "./src/common/color"
import {Appearance} from "react-native"

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
