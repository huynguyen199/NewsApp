import {StyleSheet, Text, View} from "react-native"

import Button from "../button"
import Lottie from "lottie-react-native"
import Modal from "react-native-modal"
import React from "react"
import assets from "@assets"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const FailedDialog = ({
  onBackdropPress,
  isVisible,
  onPress,
  title,
  containerStyle,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <Modal
      animationInTiming={100}
      animationOutTiming={100}
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.boxIcon}>
          <Lottie
            style={styles.lottieStyle}
            source={assets.lottieFiles.warning}
            autoPlay={true}
            loop={false}
          />
        </View>
        <View style={styles.boxTitle}>
          <Text style={styles.txtTitle}>{title}</Text>
        </View>
        <Button
          onPress={onPress}
          containerStyle={styles.containerStyleBtn}
          title="Back"
        />
      </View>
    </Modal>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    lottieStyle: {
      width: 150,
      height: 150,
    },
    containerStyleBtn: {marginTop: 20, width: 130},
    txtTitle: {
      fontSize: 20,
      fontFamily: fonts.bold,
      color: colors.lightRed,
      textAlign: "center",
    },
    boxTitle: {marginHorizontal: 50, width: 220},
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
export default FailedDialog
