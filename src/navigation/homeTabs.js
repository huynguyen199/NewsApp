import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Color from "../common/Color"
import {Icon} from "react-native-elements"
import {homeTabs} from "../common/navigator"
import Home from "../screens/home/home"

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.orange,
        tabBarInactiveTintColor: Color.black,
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
          tabBarLabel: "test",
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
