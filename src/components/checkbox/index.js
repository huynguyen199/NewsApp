import {View, Text} from "react-native"
import React from "react"
import {Icon, CheckBox as Check} from "@rneui/themed"
import {useTheme} from "@react-navigation/native"

const CheckBox = () => {
  const {colors} = useTheme()
  return (
    <>
      <Check
        containerStyle={{
          backgroundColor: null,
          alignSelf: "flex-end",
        }}
        checkedIcon={
          <Icon name="checkbox" type="ionicon" color="red" size={20} />
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

export default CheckBox
