import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {mainStack} from "../common/navigator"
import HomeTabs from "./homeTabs"
import Topic from "../screens/home/topic"

const Stack = createStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{gestureEnabled: false}}
      // initialRouteName={mainStack.homeTab}
    >
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.topic}
        component={Topic}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.homeTab}
        component={HomeTabs}
      />
    </Stack.Navigator>
  )
}

export default MainStack
