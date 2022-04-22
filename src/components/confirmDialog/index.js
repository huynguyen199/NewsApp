import {View, Text, StyleSheet} from "react-native"
import React from "react"
import Modal from "react-native-modal"
import {Icon} from "@rneui/themed"
import {Ionicons} from "../../common/icon"
import Button from "../button"
import {useTheme} from "@rneui/themed"

const ConfirmDialog = ({onBackdropPress, isVisible, onPress, title}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <Modal onBackdropPress={onBackdropPress} isVisible={isVisible}>
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
        <Button
          onPress={onPress}
          containerStyle={styles.txtBtnClose}
          title="Back"
        />
      </View>
    </Modal>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtBtnClose: {marginTop: 20, width: 130},
    txtTitle: {
      fontSize: 20,
      fontFamily: "SourceSansPro-Bold",
      textAlign: "center",
    },
    boxTitle: {marginHorizontal: 50},
    topIcon: {
      paddingVertical: 10,
    },
    container: {
      justifyContent: "center",
      backgroundColor: "white",
      alignItems: "center",
      borderRadius: 20,
      padding: 40,
    },
  })
export default ConfirmDialog
