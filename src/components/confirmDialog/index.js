import {View, Text, StyleSheet} from "react-native"
import React from "react"
import Modal from "react-native-modal"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import Button from "../button"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const ConfirmDialog = ({
  onBackdropPress,
  isVisible,
  title,
  onAccept,
  onReject,
}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <Modal
      animationInTiming={100}
      animationOutTiming={100}
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.topIcon}>
          <Icon
            name={Ionicons.warningOutline}
            type="ionicon"
            color={colors.lightRed}
            solid={true}
            size={100}
          />
        </View>
        <View style={styles.boxTitle}>
          <Text style={styles.txtTitle}>{title}</Text>
        </View>

        <View style={styles.boxRow}>
          <Button
            onPress={onReject}
            containerStyle={styles.txtBtnClose}
            title="No"
          />
          <Button
            onPress={onAccept}
            textStyle={styles.txtStyleYes}
            containerStyle={styles.txtBtnYes}
            title="Yes"
          />
        </View>
      </View>
    </Modal>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxRow: {flexDirection: "row"},
    txtStyleYes: {
      color: colors.lightRed,
    },
    txtBtnClose: {
      marginTop: 20,
      width: 130,
      marginRight: 5,
      borderWidth: 1,
      borderColor: colors.lightRed,
    },
    txtBtnYes: {
      marginTop: 20,
      width: 130,
      marginLeft: 5,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lightRed,
    },
    txtTitle: {
      fontSize: 20,
      fontFamily: fonts.bold,
      textAlign: "center",
    },
    boxTitle: {marginHorizontal: 50},
    topIcon: {
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
export default ConfirmDialog
