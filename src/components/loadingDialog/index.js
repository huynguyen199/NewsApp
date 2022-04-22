import {View, Text, ActivityIndicator} from "react-native"
import React from "react"
import Modal from "react-native-modal"
import {useTheme} from "@react-navigation/native"

const LoadingDialog = ({onBackdropPress, isVisible}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <Modal onBackdropPress={onBackdropPress} isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.boxIcon}>
          <ActivityIndicator size={50} color={colors.lightRed} />
        </View>
        <View style={styles.boxTitle}>
          <Text style={styles.txtTitle}>Please wait...</Text>
        </View>
      </View>
    </Modal>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      fontSize: 20,
      fontFamily: "SourceSansPro-Bold",
      color: colors.lightRed,
      textAlign: "center",
    },
    boxTitle: {marginHorizontal: 50},
    boxIcon: {
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

export default LoadingDialog