import {View, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import {Icon} from "@rneui/themed"

const IconButton = ({name, style, onPress, color}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.boxNotify, style]}>
        <Icon
          // onPress={onGoBackHome}
          name={name}
          type="ionicon"
          color={color ?? colors.lightRed}
          size={20}
        />
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxNotify: {
      backgroundColor: "rgba(252, 50, 50, 0.09)",
      padding: 10,
      borderRadius: 5,
    },
  })

export default IconButton
