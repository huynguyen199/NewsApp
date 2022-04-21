import {Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"

const SocicalButton = ({containerStyle, uri}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <Image
        style={styles.imageStyle}
        source={{
          uri,
        }}
      />
      <Text style={styles.txtTitle}>Facebook</Text>
    </TouchableOpacity>
  )
}

export default SocicalButton

const makeStyles = (colors) =>
  StyleSheet.create({
    imageStyle: {width: 30, height: 30},
    txtTitle: {
      fontSize: 16,
      color: "black",
      fontFamily: "SourceSansPro-Bold",
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
