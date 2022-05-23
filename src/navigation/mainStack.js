import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {mainStack} from "@common/navigator"
import HomeTabs from "./homeTabs"
import Topic from "@screens/home/topic"
import Source from "@screens/home/source"
import Detail from "@screens/home/detail"
import ProfileSettings from "@screens/profile/profileSettings"
import EditProfile from "@screens/profile/editProfile"
import Appearance from "@screens/profile/appearance"
import CreateNews from "@screens/post/createNews"

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
        name={mainStack.detail}
        component={Detail}
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
      {/* profile */}
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.profileSettings}
        component={ProfileSettings}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.editProfile}
        component={EditProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.appearance}
        component={Appearance}
      />
      {/* my news */}
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.createNews}
        component={CreateNews}
      />
    </Stack.Navigator>
  )
}

export default MainStack
