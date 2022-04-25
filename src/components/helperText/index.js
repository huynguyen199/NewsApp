import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {Ionicons} from "@common/icon"
import {Icon} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const HelperText = ({style, title, isVisible}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <>
      {isVisible && (
        <View style={[styles.container, style]}>
          <View style={styles.boxRow}>
            <View style={styles.containerCircle}>
              <Icon
                name={Ionicons.alertOutline}
                type="ionicon"
                color={colors.white}
                size={14}
              />
            </View>
            <Text style={styles.txtTitle}>{title}</Text>
          </View>
        </View>
      )}
    </>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      marginLeft: 6,
      color: colors.red,
      fontFamily: fonts.regular,
    },
    containerCircle: {
      backgroundColor: colors.red,
      borderRadius: 10,
      marginLeft: 10,
    },
    boxRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    container: {
      backgroundColor: "rgba(252, 50, 50, 0.09)",
      padding: 5,
      borderRadius: 25,
    },
  })

export default HelperText
