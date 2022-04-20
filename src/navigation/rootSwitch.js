import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import AuthStack from "./authStack"
import {rootSwitch} from "../common/navigator"

const Stack = createStackNavigator()

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name={rootSwitch.main} component={MainStack} /> */}
      <Stack.Screen name={rootSwitch.auth} component={AuthStack} />
    </Stack.Navigator>
  )
}

export default RootStack
