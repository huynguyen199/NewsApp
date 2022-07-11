import {StyleSheet, Text} from "react-native"

import {Controller} from "react-hook-form"
import HelperText from "@components/helperText"
import Input from "@components/input"
import React from "react"
import fonts from "@assets/fonts"
import {phoneContraints} from "@common/validator"
import {sizes} from "../../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const PhoneContainer = ({control, errors}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)

  return (
    <>
      <Text style={styles.txtTitle}>
        Phone Number<Text style={{color: colors.red}}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder={"Phone Number"}
            containerStyle={styles.inputContainerStyle}
            keyboardType={"number-pad"}
            value={value}
            placeholderTextColor={colors.grey}
            onChangeText={onChange}
          />
        )}
        name="phoneNumber"
        rules={phoneContraints}
      />
      <HelperText
        isVisible={errors.phoneNumber && errors.phoneNumber.message}
        title={errors.phoneNumber && errors.phoneNumber.message}
        containerStyle={styles.errorContainerStyle}
      />
    </>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    errorContainerStyle: {height: 30},
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: sizes.h2,

      marginLeft: 20,
      color: colors.black,
    },
    inputContainerStyle: {marginTop: 5},
  })

export default PhoneContainer
