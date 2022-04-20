import React from "react"
import {authStack} from "../common/navigator"
import {createStackNavigator} from "@react-navigation/stack"
import Login from "../screens/auth/login"

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={authStack.login}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name={authStack.login}
        component={Login}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
