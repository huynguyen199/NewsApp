import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import {useNavigation, useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const LeftComponent = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const navigation = useNavigation()
  const onBackHome = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={onBackHome} style={styles.container}>
      <View style={styles.boxRow}>
        <Icon
          name={Ionicons.back}
          type="ionicon"
          color={colors.lightRed}
          size={30}
        />
        <Text style={styles.txtTitle}>Search</Text>
      </View>
    </TouchableOpacity>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {color: colors.black, fontFamily: fonts.bold, fontSize: 20},
    boxRow: {flexDirection: "row", alignItems: "center"},
    container: {
      alignItems: "center",
      height: 40,
      justifyContent: "center",
      marginLeft: 10,
    },
  })

export default LeftComponent
