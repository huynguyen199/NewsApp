import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"
import {Ionicons} from "../../../common/icon"

const RightComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <View style={styles.boxNotify}>
        <Icon
          // onPress={onGoBackHome}
          name={Ionicons.notifications}
          type="ionicon"
          color={colors.lightRed}
          size={20}
        />
      </View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxNotify: {
      backgroundColor: "rgba(252, 50, 50, 0.09)",
      padding: 10,
      borderRadius: 5,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
  })
export default RightComponent
