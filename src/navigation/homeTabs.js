import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {homeTabs} from "../common/navigator"
import Home from "../screens/home/home"

import {useTheme} from "@react-navigation/native"
import {Icon} from "@rneui/themed"

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
  const {colors} = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.lightRed,
        tabBarInactiveTintColor: colors.white,
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
    </Tab.Navigator>
  )
}

export default HomeTabs
