import {View, Text, StyleSheet, Dimensions} from "react-native"
import React from "react"
import Modal from "react-native-modal"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import Button from "../button"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const {width} = Dimensions.get("window")

const SuccessDialog = ({
  title,
  titleButton,
  onBackdropPress,
  isVisible,
  onPress,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <Modal onBackdropPress={onBackdropPress} isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.boxIcon}>
          <Icon
            name={Ionicons.checkMarkFilled}
            type="ionicon"
            color="rgba(253,64,94,255)"
            solid={true}
            size={100}
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
    containerStyleBtn: {marginTop: 20, width: width / 1.7},
    txtTitle: {
      fontSize: 20,
      fontFamily: fonts.bold,
      color: colors.lightRed,
      textAlign: "center",
    },
    boxTitle: {marginHorizontal: 20, marginVertical: 5},
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
export default SuccessDialog
