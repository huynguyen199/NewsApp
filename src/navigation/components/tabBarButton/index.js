import {View, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import {Icon} from "@rneui/themed"

const TabBarButton = ({name, style, color}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={[{...styles.boxNotify, backgroundColor: color}, style]}>
      <Icon
        name={name}
        type="ionicon"
        color={color === colors.lightRed ? colors.white : colors.lightRed}
        size={20}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxNotify: {
      backgroundColor: "rgba(252, 50, 50, 0.09)",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
  })

export default TabBarButton
