import {View, Text, StyleSheet} from "react-native"
import React, {useState} from "react"
import Label from "./label"
import HelperText from "../../../components/helperText"
import {useTheme} from "@react-navigation/native"
import Input from "../../../components/input"
import Button from "../../../components/button"
import EyeIcon from "./eyeIcon"
import EyeOffIcon from "./eyeOffIcon"

import CheckBox from "@react-native-community/checkbox"
import {Controller, useForm} from "react-hook-form"
import {emailContraints, passwordContraints} from "../../../common/validator"
import auth from "@react-native-firebase/auth"
import useAuth from "../../../hooks/useAuth"

const FormLogin = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const {userInfo} = useAuth()
  console.log(
    "DEBUG: - file: formLogin.js - line 23 - FormLogin - userInfo",
    userInfo,
  )
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const showPasswords = () => {
    setIsVisible(!isVisible)
  }
  const onSubmitForm = () => {
    auth()
      .signInWithEmailAndPassword("test1@gmail.com", "123456")
      .then(() => {
        console.log("User account created & signed in!")
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!")
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!")
        }

        console.error(error)
      })
  }

  return (
    <>
      <View>
        <Label style={styles.styleEmail} title={"Email"} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              containerStyle={styles.inputEmail}
              placeholder={"Enter your email"}
              placeholderTextColor={colors.grey}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="email"
          rules={emailContraints}
        />
      </View>
      {/* <View style={styles.boxHelperEmail}> */}
      <HelperText
        isVisible={errors.email && errors.email.message}
        title={errors.email && errors.email.message}
        style={styles.styleEmailHelper}
      />
      {/* </View> */}

      <View>
        <Label title={"Password"} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              containerStyle={styles.inputPassword}
              placeholder={"Enter your password"}
              placeholderTextColor={colors.grey}
              secureTextEntry={isVisible}
              value={value}
              onChangeText={onChange}
              rightComponent={
                isVisible ? (
                  <EyeIcon onPress={showPasswords} />
                ) : (
                  <EyeOffIcon onPress={showPasswords} />
                )
              }
            />
          )}
          name="password"
          rules={passwordContraints}
        />
      </View>
      {/* <View style={styles.boxHelperPassword}> */}
      <HelperText
        isVisible={errors.password && errors.password.message}
        title={errors.password && errors.password.message}
        style={styles.stylePasswordHelper}
      />
      {/* </View> */}
      <View style={styles.boxRow}>
        <CheckBox
          tintColors={{
            true: "rgba(253,64,94,255)",
            false: "rgba(253,64,94,255)",
          }}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.txtTitle}>Remember me</Text>
      </View>
      <Button title={"Sign in"} onPress={onSubmitForm} />
    </>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    inputPassword: {marginTop: 5},
    boxHelperPassword: {height: 30, marginTop: 3},
    boxHelperEmail: {height: 28, marginTop: 3},
    inputEmail: {marginTop: 5},
    styleEmail: {marginTop: 5},
    stylePasswordHelper: {},
    styleEmailHelper: {},
    txtTitle: {
      fontFamily: "SourceSansPro-Bold",
      color: colors.red,
      marginLeft: 5,
    },
    boxRow: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 10,
      marginVertical: 5,
    },
  })

export default FormLogin
