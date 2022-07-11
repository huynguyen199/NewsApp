import {Image, StyleSheet, Text, TouchableOpacity} from "react-native"

import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const SocicalButton = ({onPress, containerStyle, uri, title}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Image
        style={styles.imageStyle}
        source={{
          uri,
        }}
      />
      <Text style={styles.txtTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SocicalButton

const makeStyles = (colors) =>
  StyleSheet.create({
    imageStyle: {width: 30, height: 30},
    txtTitle: {
      fontSize: 16,
      color: colors.black,
      fontFamily: fonts.bold,
      marginLeft: 10,
    },
    container: {
      backgroundColor: colors.primary,
      flexDirection: "row",
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: colors.ghostWhite,
    },
  })
