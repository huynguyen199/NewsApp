import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"
import {Icon} from "@rneui/themed"

const Button = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  leftIcon,
  disabled,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={[
          disabled ? styles.disabledContainer : styles.container,
          containerStyle,
        ]}>
        <View style={styles.boxRow}>
          {leftIcon && (
            <Icon
              name={leftIcon}
              type="ionicon"
              color={"red"}
              solid={true}
              size={20}
              style={styles.iconStyle}
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
    iconStyle: {marginRight: 5},
    boxRow: {flexDirection: "row"},
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
    disabledContainer: {
      backgroundColor: colors.grey,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
    },
  })
export default Button
