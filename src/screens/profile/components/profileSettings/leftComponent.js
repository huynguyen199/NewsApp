import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Icon} from "@rneui/themed"
import React from "react"
import fonts from "@assets/fonts"
import {sizes} from "../../../../assets/fonts"

const LeftComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()

  const onBackProfile = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackProfile}>
        <Icon
          // onPress={onGoBackHome}
          name={"arrow-back-outline"}
          type="ionicon"
          color={colors.lightRed}
          size={36}
        />
      </TouchableOpacity>
      <Text style={styles.txtTitle}>Settings</Text>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      fontSize: sizes.h1,
      color: colors.black,
      fontFamily: fonts.bold,
      marginLeft: 10,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: 200,
    },
  })
export default LeftComponent
