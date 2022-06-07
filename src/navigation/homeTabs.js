import React, {useContext} from "react"

import Bookmark from "../screens/bookmark/bookmark"
import Home from "../screens/home/home"
import {HomeContext} from "../context/home"
import {Host} from "react-native-portalize"
import {Image} from "@rneui/themed"
import {Ionicons} from "../common/icon"
import Post from "../screens/post/post"
import Profile from "../screens/profile/profile"
import {StyleSheet} from "react-native"
import TabBarButton from "./components/tabBarButton"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {homeTabs} from "../common/navigator"
import {useTheme} from "@react-navigation/native"

const Tab = createBottomTabNavigator()

const screenOptions = (colors) => ({
  tabBarActiveTintColor: colors.lightRed,
  tabBarInactiveTintColor: colors.ghostRed,
  tabBarStyle: {
    height: 60,
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
  const {darkScheme} = useContext(HomeContext)

  return (
    <Host>
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
            tabBarLabel: "Bookmark",
            tabBarIcon: ({color, size}) => (
              <TabBarButton name={Ionicons.bookmark} color={color} />
            ),
            headerShown: false,
          }}
          name={homeTabs.bookmark}
          component={Bookmark}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({color, size}) => (
              <Image
                style={styles.imageFont}
                source={{
                  uri: darkScheme
                    ? "https://see.fontimg.com/api/renderfont4/OV9ee/eyJyIjoiZnMiLCJoIjo4MSwidyI6MTAwMCwiZnMiOjgxLCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzIxMUYxRiIsInQiOjF9/bmV3cw/lucy-said-ok-personal-use-italic.png"
                    : "https://see.fontimg.com/api/renderfont4/K7axe/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/bmV3cw/hugh-is-life-personal-use-italic.png",
                }}
              />
            ),
            headerShown: false,
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault()
            },
          }}
          name={"test"}
          component={Profile}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "My post",
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
    </Host>
  )
}

const styles = StyleSheet.create({
  imageFont: {width: 70, height: 20, resizeMode: "stretch"},
})
export default HomeTabs
