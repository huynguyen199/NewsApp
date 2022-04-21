import {StyleSheet} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {Ionicons} from "../../../../common/icon"
Ionicons
const EyeOffIcon = ({onPress, color = "grey"}) => {
  return (
    <Icon
      onPress={onPress}
      type="ionicon"
      containerStyle={styles.iconStyle}
      iconStyle={styles.iconEye}
      name={Ionicons.eyeOff}
      size={19}
      color={color}
    />
  )
}

const styles = StyleSheet.create({
  iconEye: {padding: 10, borderRadius: 50},
  iconStyle: {
    right: -10,
  },
})

export default EyeOffIcon
