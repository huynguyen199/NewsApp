import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useNavigation, useTheme} from "@react-navigation/native"

import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import React from "react"
import fonts from "@assets/fonts"
import {sizes} from "../../../../assets/fonts"

const LeftComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()
  const onBackHome = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxRow}>
        <TouchableOpacity onPress={onBackHome}>
          <Icon
            name={Ionicons.back}
            type="ionicon"
            color={colors.lightRed}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.txtTitle}>Search</Text>
      </View>
    </View>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      color: colors.black,
      fontFamily: fonts.bold,
      fontSize: sizes.h1,
      marginLeft: 8,
    },
    boxRow: {flexDirection: "row", alignItems: "center"},
    container: {
      alignItems: "center",
      height: 40,
      justifyContent: "center",
      marginLeft: 10,
    },
  })

export default LeftComponent
