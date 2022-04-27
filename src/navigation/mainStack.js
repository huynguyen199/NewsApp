import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {mainStack} from "../common/navigator"
import HomeTabs from "./homeTabs"
import Topic from "../screens/home/topic"
import Source from "../screens/home/source"

const Stack = createStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{gestureEnabled: false}}
      // initialRouteName={mainStack.homeTab}
    >
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.homeTab}
        component={HomeTabs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.source}
        component={Source}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.topic}
        component={Topic}
      />
    </Stack.Navigator>
  )
}

export default MainStack
