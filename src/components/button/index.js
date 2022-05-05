import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"
import {Ionicons} from "../../common/icon"
import {Icon} from "@rneui/themed"

const Button = ({title, onPress, containerStyle, textStyle, leftIcon}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <View style={{flexDirection: "row"}}>
          {/* <Text>das</Text> */}
          {leftIcon && (
            <Icon
              name={leftIcon}
              type="ionicon"
              color={"red"}
              solid={true}
              size={20}
              style={{marginRight: 5}}
            />
          )}
          <Text style={[styles.txtTitle, textStyle]}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      color: colors.white,
      fontFamily: fonts.bold,
      fontSize: 16,
    },
    container: {
      backgroundColor: colors.lightRed,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
    },
  })
export default Button
