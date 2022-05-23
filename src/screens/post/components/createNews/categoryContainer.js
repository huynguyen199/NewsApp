import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import {useTheme} from "@react-navigation/native"
import HelperText from "@components/helperText"
import {categoryContraints} from "@common/validator"
import Input from "@components/input"
import {Controller} from "react-hook-form"
import fonts from "@assets/fonts"
import {Ionicons} from "@common/icon"
import {Icon} from "@rneui/themed"

const CategoryContainer = ({control, errors, onPress}) => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        Select Category<Text style={{color: colors.red}}>*</Text>
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TouchableOpacity onPress={onPress}>
            <Input
              editable={false}
              rightComponent={
                <Icon
                  name={Ionicons.caretDown}
                  type="ionicon"
                  color={colors.black}
                  solid={true}
                  size={20}
                />
              }
              value={value}
              onChangeText={onChange}
              placeholder={"Select Category"}
              containerStyle={styles.inputContainerStyle}
            />
          </TouchableOpacity>
        )}
        name="category"
        rules={categoryContraints}
      />
      <HelperText
        isVisible={errors.category && errors.category.message}
        title={errors.category && errors.category.message}
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

export default CategoryContainer
