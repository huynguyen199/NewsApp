import {StyleSheet, Text, View} from "react-native"

import {Icon} from "@rneui/themed"
import React from "react"
import fonts from "../assets/fonts"

export const toastConfig = {
  tomatoToast: ({text1, text2, props}) => (
    <View style={[styles.container, {borderColor: props.color ?? "lawngreen"}]}>
      <View style={styles.boxRow}>
        <Icon
          style={styles.iconStyle}
          name={text2}
          color={props.color ?? "lawngreen"}
          type="ionicon"
          size={30}
        />
        <Text style={styles.txtTitle}>{text1}</Text>
      </View>
    </View>
  ),
  trashToast: ({text1, text2, props}) => (
    <View style={styles.trashContainer}>
      <View style={styles.boxRow}>
        <Icon
          style={styles.iconStyle}
          name={text2}
          color={"red"}
          type="ionicon"
          size={30}
        />
        <Text style={styles.txtTitle}>{text1}</Text>
      </View>
    </View>
  ),
}
const styles = StyleSheet.create({
  txtTitle: {color: "black", fontFamily: fonts.regular},
  iconStyle: {marginLeft: 10},
  boxRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  container: {
    height: 55,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    borderLeftWidth: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  trashContainer: {
    height: 55,
    width: "90%",
    backgroundColor: "white",
    borderColor: "red",
    borderRadius: 10,
    borderLeftWidth: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
})
