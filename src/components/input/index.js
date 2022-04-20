import {View, TextInput, Text, StyleSheet} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
const Input = (props, {rightComponent}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        <TextInput style={styles.styleInput} {...props} />
      </View>
      <View style={styles.rightBox}>{rightComponent}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  rightBox: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  leftBox: {flex: 1},
  styleInput: {
    marginHorizontal: 15,
    backgroundColor: "red",
    fontFamily: "SourceSansPro-Bold",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(253,64,94,255)",
    flexDirection: "row",
  },
})
export default Input
