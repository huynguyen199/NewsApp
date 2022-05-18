import {Text, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useNavigation, useTheme} from "@react-navigation/native"
import {Icon} from "@rneui/themed"
import fonts from "@assets/fonts"

const LeftComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onBackSource = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={onBackSource} style={styles.container}>
      <Icon
        // onPress={onGoBackHome}
        name={"arrow-back-outline"}
        type="ionicon"
        color={colors.lightRed}
        size={30}
      />
      <Text style={styles.txtTitle}>Choose Your Topics</Text>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      color: colors.black,
      fontFamily: fonts.bold,
      fontSize: 20,
      marginLeft: 10,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: 300,
    },
  })

export default LeftComponent
