import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import React from "react"
import {Icon} from "@rneui/themed"
import {Ionicons} from "@common/icon"
import {useTheme} from "@react-navigation/native"
import fonts from "@assets/fonts"

const TagItem = ({setTags, item}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  const onDeleteTag = () => {
    setTags((prev) => prev.filter((element) => element !== item))
  }

  return (
    <TouchableOpacity onPress={onDeleteTag} style={styles.container}>
      <View style={styles.boxRow}>
        <Text style={{color: colors.white, fontFamily: fonts.bold}}>
          {item}
        </Text>
        <Icon
          style={styles.iconStyle}
          name={Ionicons.closeCircle}
          type="ionicon"
          color={colors.white}
          size={18}
        />
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    iconStyle: {marginLeft: 5},
    boxRow: {flexDirection: "row", alignItems: "center"},
    container: {
      backgroundColor: colors.lightRed,
      paddingHorizontal: 15,
      paddingVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      marginRight: 5,
    },
  })
export default TagItem
