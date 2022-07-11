import {Dimensions, StyleSheet, Text, View} from "react-native"
import React, {useRef} from "react"

import Button from "../button"
import Lottie from "lottie-react-native"
import Modal from "react-native-modal"
import assets from "@assets"
import fonts from "@assets/fonts"
import {sizes} from "../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const {width} = Dimensions.get("window")

const SuccessDialog = ({
  title,
  titleButton,
  onBackdropPress,
  isVisible,
  onPress,
}) => {
  const successRef = useRef(null)

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
          <Lottie
            ref={successRef}
            style={styles.lottieStyle}
            source={assets.lottieFiles.success}
            autoPlay={true}
            loop={false}
          />
        </View>

        <View style={styles.boxTitle}>
          <Text style={styles.txtTitle}>
            {/* Great! Your account has been created successfully. */}
            {title}
          </Text>
        </View>
        <Button
          onPress={onPress}
          containerStyle={styles.containerStyleBtn}
          title={titleButton}
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
    containerStyleBtn: {marginTop: 20, width: width / 1.7},
    txtTitle: {
      fontSize: sizes.h2,
      fontFamily: fonts.bold,
      color: colors.lightRed,
      textAlign: "center",
    },
    boxTitle: {marginHorizontal: 20, marginVertical: 5},
    boxIcon: {
      paddingVertical: 10,
      width: 150,
      height: 150,
    },
    container: {
      justifyContent: "center",
      backgroundColor: colors.white,
      alignItems: "center",
      borderRadius: 20,
      padding: 40,
    },
  })
export default SuccessDialog
