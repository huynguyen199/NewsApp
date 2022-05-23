import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {homeTabs} from "../common/navigator"
import Home from "../screens/home/home"
import {useTheme} from "@react-navigation/native"
import Profile from "../screens/profile/profile"
import Post from "../screens/post/post"
import {Ionicons} from "../common/icon"
import TabBarButton from "./components/tabBarButton"

const Tab = createBottomTabNavigator()

const screenOptions = (colors) => ({
  tabBarActiveTintColor: colors.lightRed,
  tabBarInactiveTintColor: colors.ghostRed,
  tabBarStyle: {
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "transparent",
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
    borderColor: "whiteSmoke",
  },
  tabBarItemStyle: {
    borderRadius: 20,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    margin: 0,
  },
  tabBarShowLabel: false,
})

const HomeTabs = () => {
  const {colors} = useTheme()

  return (
    <Tab.Navigator screenOptions={screenOptions(colors)}>
      <Tab.Screen
        options={{
          tabBarLabel: "My News",
          tabBarIcon: ({color, size}) => (
            <TabBarButton name={Ionicons.homeSharp} color={color} />
          ),
          headerShown: false,
        }}
        name={homeTabs.home}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "My News",
          tabBarIcon: ({color, size}) => (
            <TabBarButton name={Ionicons.menu} color={color} />
          ),
          headerShown: false,
        }}
        name={homeTabs.myNews}
        component={Post}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color, size}) => (
            <TabBarButton name={Ionicons.person} color={color} />
          ),
          headerShown: false,
        }}
        name={homeTabs.me}
        component={Profile}
      />
    </Tab.Navigator>
  )
}

export default HomeTabs
