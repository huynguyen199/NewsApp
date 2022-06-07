import {StyleSheet, Text, View} from "react-native"

import {Controller} from "react-hook-form"
import HelperText from "@components/helperText"
import Input from "@components/input"
import React from "react"
import fonts from "@assets/fonts"
import {titleContraints} from "@common/validator"
import {useTheme} from "@react-navigation/native"

const TitleContainer = ({control, errors}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        Title<Text style={{color: colors.red}}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            value={value}
            placeholderTextColor={colors.grey}
            onChangeText={onChange}
            placeholder={"Title"}
            containerStyle={styles.inputContainerStyle}
          />
        )}
        name="title"
        rules={titleContraints}
      />
      <HelperText
        isVisible={errors.title && errors.title.message}
        title={errors.title && errors.title.message}
        containerStyle={styles.errorContainerStyle}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {marginTop: 5},
    errorContainerStyle: {marginVertical: 10},
    inputContainerStyle: {marginTop: 5, borderColor: colors.whiteSmoke},
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      marginLeft: 20,
      color: colors.black,
    },
  })

export default TitleContainer
