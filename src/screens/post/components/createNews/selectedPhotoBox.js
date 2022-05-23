import {View, ImageBackground, TouchableOpacity, StyleSheet} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {Material} from "@common/icon"
import {useTheme} from "@react-navigation/native"

const SelectedPhotoBox = ({image, onPress}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{
          uri: image.uri,
        }}
        resizeMode="cover"
        imageStyle={styles.imageStyle}
        style={styles.backgroundStyle}>
        <View style={styles.boxEditBottom}>
          <Icon
            name={Material.edit}
            type="material"
            color={colors.white}
            solid={true}
            size={30}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    backgroundStyle: {flex: 1},
    boxEditBottom: {
      backgroundColor: colors.lightRed,
      width: 60,
      height: 55,
      position: "absolute",
      bottom: 0,
      right: 0,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      justifyContent: "center",
    },
    imageStyle: {borderRadius: 30},
    container: {
      width: "100%",
      height: 250,
    },
  })

export default SelectedPhotoBox
