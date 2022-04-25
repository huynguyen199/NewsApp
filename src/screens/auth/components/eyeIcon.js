import {StyleSheet} from "react-native"
import React from "react"
import {Ionicons} from "@common/icon"
import {Icon} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"

const EyeIcon = ({onPress, color = "grey"}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <Icon
      onPress={onPress}
      type="ionicon"
      containerStyle={styles.iconStyle}
      iconStyle={styles.iconEye}
      name={Ionicons.eye}
      size={19}
      color={color}
    />
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    iconEye: {padding: 10, borderRadius: 50},
    iconStyle: {
      right: -10,
    },
  })

export default EyeIcon
