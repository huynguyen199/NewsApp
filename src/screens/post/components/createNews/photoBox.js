import {StyleSheet, Text, TouchableOpacity} from "react-native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import fonts from "@assets/fonts"
import {sizes} from "../../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const PhotoBox = ({onPress}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon
        name={Ionicons.addOutline}
        type="ionicon"
        color={colors.lightRed}
        solid={true}
        size={40}
      />
      <Text style={styles.txtTitle}>Add Cover Photos</Text>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {fontFamily: fonts.regular, fontSize: sizes.h3},
    container: {
      backgroundColor: colors.ghostWhite,
      width: "100%",
      height: 200,
      borderWidth: 1,
      borderStyle: "dashed",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderColor: colors.grey,
    },
  })
export default PhotoBox
