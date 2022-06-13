import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const SearchBar = (props) => {
  const {
    containerStyle,
    rightComponent,
    hasClearButton,
    onClearText,
    containerStyleClear,
  } = props
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftBox}>
        <TextInput style={styles.styleInput} {...props} />
      </View>
      {hasClearButton && props.value.length > 0 && (
        <TouchableOpacity
          onPress={onClearText}
          style={[styles.containerTouchable, containerStyleClear]}>
          <Icon
            name={Ionicons.closeCircle}
            color={colors.grey}
            type="ionicon"
            size={20}
          />
        </TouchableOpacity>
      )}
      {hasClearButton && props.value.length === 0 && (
        <View style={styles.rightBox}>{rightComponent}</View>
      )}
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    containerTouchable: {justifyContent: "center"},
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
