import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {homeTabs} from "../common/navigator"
import Home from "../screens/home/home"

import {useTheme} from "@react-navigation/native"
import {Icon} from "@rneui/themed"
import Profile from "../screens/profile/profile"

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
  const {colors} = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          margin: 0,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color, size}) => (
            <Icon name="newspaper-outline" type="ionicon" color={color} />
          ),
          headerShown: false,
        }}
        name={homeTabs.home}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "profile",
          tabBarIcon: ({color, size}) => (
            <Icon name="newspaper-outline" type="ionicon" color={color} />
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
