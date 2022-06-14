import Appearance from "@screens/profile/appearance"
import {CardStyleInterpolators} from "@react-navigation/stack"
import CreateNews from "@screens/post/createNews"
import Detail from "@screens/home/detail"
import EditProfile from "@screens/profile/editProfile"
import HomeTabs from "./homeTabs"
import ManagerRss from "@screens/profile/managerRss"
import ProfileSettings from "@screens/profile/profileSettings"
import React from "react"
import Search from "@screens/search/search"
import SearchFound from "@screens/search/searchFound"
import SearchRss from "@screens/home/searchRss"
import Source from "@screens/home/source"
import Topic from "@screens/home/topic"
import {createStackNavigator} from "@react-navigation/stack"
import {mainStack} from "@common/navigator"
import {useTheme} from "@react-navigation/native"

const Stack = createStackNavigator()

const MainStack = () => {
  const {colors} = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.white,
          },
        }}
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
        name={mainStack.managerRss}
        component={ManagerRss}
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
      {/* search */}
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.search}
        component={Search}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.searchFound}
        component={SearchFound}
      />
      {/* search rss */}
      <Stack.Screen
        options={{headerShown: false}}
        name={mainStack.searchRss}
        component={SearchRss}
      />
    </Stack.Navigator>
  )
}

export default MainStack
