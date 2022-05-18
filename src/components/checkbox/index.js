import React from "react"
import {Icon, CheckBox as Check} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"
import {StyleSheet} from "react-native"

const CheckBox = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <>
      <Check
        containerStyle={styles.containerStyle}
        checkedIcon={
          <Icon name="checkbox" type="ionicon" color={colors.red} size={20} />
        }
        uncheckedIcon={
          <Icon
            name="crop-square"
            type="material-community"
            color={"white"}
            size={24}
          />
        }
        checked={false}
        //   onPress={() => setCheck4(!check4)}
      />
    </>
  )
}
const makeStyles = (colors) =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: null,
      alignSelf: "flex-end",
    },
  })

export default CheckBox
