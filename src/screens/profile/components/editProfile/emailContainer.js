import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import HelperText from "../../../../components/helperText"
import {emailContraints} from "../../../../common/validator"
import Input from "../../../../components/input"
import {Controller} from "react-hook-form"
import fonts from "../../../../assets/fonts"

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
      fontSize: 16,
      marginLeft: 20,
    },
  })

export default EmailContainer
