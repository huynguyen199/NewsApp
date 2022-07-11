import {StyleSheet, Text, View} from "react-native"

import {Controller} from "react-hook-form"
import HelperText from "@components/helperText"
import Input from "@components/input"
import React from "react"
import {aboutContraints} from "@common/validator"
import fonts from "@assets/fonts"
import {sizes} from "../../../../assets/fonts"
import {useTheme} from "@react-navigation/native"

const AboutContainer = ({control, errors}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View>
      <Text style={styles.txtPanel}>
        About<Text style={styles.txtTitle}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={"About"}
            multiline
            placeholderTextColor={colors.grey}
            containerStyle={styles.inputContainerStyle}
          />
        )}
        name="about"
        rules={aboutContraints}
      />
      <HelperText
        isVisible={errors.about && errors.about.message}
        title={errors.about && errors.about.message}
        containerStyle={styles.errorContainerStyle}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    errorContainerStyle: {height: 30},
    inputContainerStyle: {marginTop: 5, height: 100},
    txtTitle: {color: colors.red},
    txtPanel: {
      fontFamily: fonts.bold,
      fontSize: sizes.h2,
      marginLeft: 20,
      color: colors.black,
    },
  })

export default AboutContainer
