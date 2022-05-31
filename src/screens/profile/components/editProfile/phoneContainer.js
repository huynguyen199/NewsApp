import {Text, StyleSheet} from "react-native"
import React from "react"
import {Controller} from "react-hook-form"
import {useTheme} from "@react-navigation/native"
import HelperText from "@components/helperText"
import {phoneContraints} from "@common/validator"
import fonts from "@assets/fonts"
import Input from "@components/input"

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
      fontSize: 16,
      marginLeft: 20,
      color: colors.black,
    },
    inputContainerStyle: {marginTop: 5},
  })

export default PhoneContainer
