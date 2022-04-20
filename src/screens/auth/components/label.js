import {View, Text, StyleSheet} from "react-native"
import React from "react"

const Label = ({title}) => {
  return (
    <View>
      <Text style={styles.styleLabel}>
        {title}
        <Text style={styles.txtTitle}>*</Text>
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  txtTitle: {color: "red"},
  styleLabel: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "SourceSansPro-Bold",
  },
})

export default Label
