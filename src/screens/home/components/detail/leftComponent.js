import {StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import {useNavigation, useTheme} from "@react-navigation/native"

const LeftComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()
  const onBackHome = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={onBackHome} style={styles.container}>
      <Icon
        name={Ionicons.back}
        type="ionicon"
        color={colors.lightRed}
        size={30}
      />
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      height: 40,
      justifyContent: "center",
    },
  })

export default LeftComponent
