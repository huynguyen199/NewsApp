import {StyleSheet, Text, View} from "react-native"

import {Controller} from "react-hook-form"
import HelperText from "@components/helperText"
import Input from "@components/input"
import React from "react"
import {contentContraints} from "@common/validator"
import fonts from "@assets/fonts"
import {useTheme} from "@react-navigation/native"

const ContentContainer = ({control, errors}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        Add News/Article<Text style={styles.txtAsterisk}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={"Type News/Article Here..."}
            style={styles.inputStyle}
            multiline={true}
            placeholderTextColor={colors.grey}
            containerStyle={styles.inputContainerStyle}
          />
        )}
        name="content"
        rules={contentContraints}
      />
      <HelperText
        isVisible={errors.content && errors.content.message}
        title={errors.content && errors.content.message}
        containerStyle={styles.errorContainerStyle}
      />
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    txtAsterisk: {color: colors.red},
    inputStyle: {
      fontFamily: fonts.regular,
      color: colors.black,
      marginHorizontal: 10,
    },
    container: {marginTop: 5},
    errorContainerStyle: {marginVertical: 10},
    inputContainerStyle: {
      marginTop: 5,
      borderColor: colors.whiteSmoke,
      borderRadius: 12,
      height: 300,
    },
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      marginLeft: 20,
      color: colors.black,
    },
  })

export default ContentContainer
