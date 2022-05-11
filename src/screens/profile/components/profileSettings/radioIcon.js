import {View, StyleSheet} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"

const RadioIcon = ({nameIcon}) => {
  const {colors} = useTheme()
  return (
    <View style={styles.container}>
      <Icon
        name={nameIcon}
        color={colors.lightRed}
        type="ionicon"
        solid={true}
        size={26}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(252, 50, 50, 0.09)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60 / 2,
  },
})

export default RadioIcon
