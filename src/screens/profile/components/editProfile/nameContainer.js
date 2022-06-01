import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import {Controller} from "react-hook-form"
import fonts from "../../../../assets/fonts"
import {nameContraints} from "../../../../common/validator"
import Input from "../../../../components/input"
import HelperText from "../../../../components/helperText"

const NameContainer = ({control, errors}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View>
      <Text style={styles.txtTitle}>
        Full Name<Text style={{color: colors.red}}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder={"Full name"}
            value={value}
            onChangeText={onChange}
            placeholderTextColor={colors.grey}
            containerStyle={styles.inputContainerStyle}
          />
        )}
        name="fullName"
        rules={nameContraints}
      />
      <HelperText
        isVisible={errors.fullName && errors.fullName.message}
        title={errors.fullName && errors.fullName.message}
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
      fontSize: 16,
      marginLeft: 20,
      color: colors.black,
    },
  })

export default NameContainer
