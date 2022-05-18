import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import HelperText from "@components/helperText"
import {titleContraints} from "@common/validator"
import Input from "@components/input"
import {Controller} from "react-hook-form"
import fonts from "@assets/fonts"

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
    },
  })

export default TitleContainer
