import {StyleSheet, Text, TouchableOpacity, View} from "react-native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import RadioIcon from "./radioIcon"
import React from "react"
import fonts from "@assets/fonts"
import {sizes} from "../../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const SettingItem = ({nameIcon, title, onPress, hasIconRight = true}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.boxRow}>
        <RadioIcon nameIcon={nameIcon} />
        <Text style={styles.txtTitle}>{title}</Text>
      </View>
      {hasIconRight && (
        <Icon
          name={Ionicons.chevronForward}
          color={colors.lightRed}
          type="ionicon"
          solid={true}
          size={20}
        />
      )}
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      marginLeft: 10,
      fontFamily: fonts.bold,
      color: colors.black,
      fontSize: sizes.h2,
    },
    boxRow: {flexDirection: "row", alignItems: "center"},
    container: {
      flexDirection: "row",
      padding: 20,
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 2,
      borderColor: colors.ghostWhite,
    },
  })

export default SettingItem
