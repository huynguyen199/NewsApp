import {View, TextInput, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import {color} from "@rneui/base"
import fonts from "@assets/fonts"

const SearchBar = (props) => {
  const {onChangeText, value, containerStyle, rightComponent} = props
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftBox}>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={styles.styleInput}
          {...props}
        />
      </View>
      <View style={styles.rightBox}>{rightComponent}</View>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    rightBox: {
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    leftBox: {flex: 1},
    styleInput: {
      marginLeft: 15,
      fontFamily: fonts.bold,
      color: colors.black,
    },
    container: {
      backgroundColor: colors.ghostWhite,
      borderRadius: 30,
      flexDirection: "row",
    },
  })
export default SearchBar
