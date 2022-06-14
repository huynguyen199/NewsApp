import {StyleSheet, Text, View} from "react-native"

import {Controller} from "react-hook-form"
import HelperText from "@components/helperText"
import Input from "@components/input"
import React from "react"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"
import {websiteContraints} from "@common/validator"

const WebsiteContainer = ({control, errors}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View>
      <Text style={styles.txtTitle}>
        Website<Text style={{color: colors.red}}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={"Website"}
            placeholderTextColor={colors.grey}
            containerStyle={styles.inputContainerStyle}
          />
        )}
        name="website"
        rules={websiteContraints}
      />
      <HelperText
        isVisible={errors.website && errors.website.message}
        title={errors.website && errors.website.message}
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

export default WebsiteContainer
