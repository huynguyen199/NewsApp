import {StyleSheet, Text, View} from "react-native"

import {Controller} from "react-hook-form"
import HelperText from "@components/helperText"
import Input from "@components/input"
import React from "react"
import {emailContraints} from "@common/validator"
import fonts from "@assets/fonts"
import {sizes} from "../../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const EmailContainer = ({control, errors}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View>
      <Text style={styles.txtTitle}>
        Email<Text style={{color: colors.red}}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={"Email"}
            placeholderTextColor={colors.grey}
            containerStyle={styles.inputContainerStyle}
          />
        )}
        name="email"
        rules={emailContraints}
      />
      <HelperText
        isVisible={errors.email && errors.email.message}
        title={errors.email && errors.email.message}
        containerStyle={styles.errorContainerStyle}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    errorContainerStyle: {height: 30},
    inputContainerStyle: {marginTop: 5},
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: sizes.h2,
      marginLeft: 20,
      color: colors.black,
    },
  })

export default EmailContainer
