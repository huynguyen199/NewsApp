import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {Ionicons} from "../../common/icon"
import {Icon} from "@rneui/themed"
import color from "../../common/color"

const HelperText = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.boxRow}>
        <View style={styles.containerCircle}>
          <Icon
            name={Ionicons.alertOutline}
            type="ionicon"
            color={color.white}
            size={15}
          />
        </View>
        <Text style={styles.txtTitle}>dsa</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  txtTitle: {marginLeft: 6, color: color.red},
  containerCircle: {
    backgroundColor: color.red,
    borderRadius: 10,
    marginLeft: 10,
  },
  boxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(252, 50, 50, 0.09)",
    padding: 5,
    borderRadius: 25,
  },
})

export default HelperText
