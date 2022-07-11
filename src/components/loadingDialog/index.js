import {ActivityIndicator, StyleSheet, Text, View} from "react-native"

import Modal from "react-native-modal"
import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const LoadingDialog = ({onBackdropPress, isVisible, title}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <Modal
      animationInTiming={100}
      animationOutTiming={100}
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.boxIcon}>
          <ActivityIndicator size={50} color={colors.lightRed} />
        </View>
        <View style={styles.boxTitle}>
          <Text style={styles.txtTitle}>{title ?? "Please wait..."}</Text>
        </View>
      </View>
    </Modal>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      fontSize: 20,
      fontFamily: fonts.bold,
      color: colors.lightRed,
      textAlign: "center",
    },
    boxTitle: {marginHorizontal: 50},
    boxIcon: {
      paddingVertical: 10,
    },
    container: {
      justifyContent: "center",
      backgroundColor: colors.white,
      alignItems: "center",
      borderRadius: 20,
      padding: 40,
    },
  })

export default LoadingDialog
