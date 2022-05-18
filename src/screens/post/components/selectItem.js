import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"
const {width} = Dimensions.get("window")

const SelectItem = ({icon, iconType, onPress, title}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon
          name={icon}
          type={iconType}
          solid={true}
          size={30}
          color={colors.lightRed}
        />
        <Text style={styles.txtTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtTitle: {
      marginLeft: 10,
      fontFamily: fonts.bold,
      color: colors.black,
      fontSize: 16,
    },
    container: {
      flexDirection: "row",
      width: width,
      padding: 15,
      alignItems: "center",
    },
  })

export default SelectItem
