import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {useNavigation, useTheme} from "@react-navigation/native"
import fonts from "../../../../assets/fonts"

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
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <Text style={styles.txtTitle}>Appearance</Text>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    iconStyle: {marginLeft: 10},
    txtTitle: {
      fontSize: 20,
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
