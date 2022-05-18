import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {Controller} from "react-hook-form"
import Input from "../../../../components/input"
import HelperText from "../../../../components/helperText"
import {useTheme} from "@react-navigation/native"
import {websiteContraints} from "../../../../common/validator"
import fonts from "../../../../assets/fonts"

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
    },
  })

export default WebsiteContainer
