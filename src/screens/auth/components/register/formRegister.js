import {View, Text, StyleSheet} from "react-native"
import React, {useState} from "react"
import {useTheme} from "@react-navigation/native"
import EyeOffIcon from "./eyeOffIcon"
import CheckBox from "@react-native-community/checkbox"
import {Controller, useForm} from "react-hook-form"
import HelperText from "@components/helperText"
import Button from "@components/button"
import EyeIcon from "./eyeIcon"
import {emailContraints, passwordContraints} from "@common/validator"
import Label from "./label"
import Input from "@components/input"
import auth from "@react-native-firebase/auth"
import SuccessDialog from "@components/successDialog"
import FailedDialog from "@components/failedDialog"
import LoadingDialog from "@components/loadingDialog"

const FormRegister = () => {
  const [isVisible, setIsVisible] = useState(true)
  const {colors} = useTheme()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const styles = makeStyles(colors)
  const {
    handleSubmit,
    setValue,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const clearForm = () => {
    setValue("email", "")
    setValue("password", "")
  }

  const showLoadingDialog = () => {
    setIsLoading(true)
  }

  const hideLoadingDialog = () => {
    setIsLoading(false)
  }

  const showSuccessDialog = () => {
    setIsSuccess(true)
  }

  const hideSuccessDialog = () => {
    setIsSuccess(false)
  }

  const showFailedDialog = () => {
    setIsFailed(true)
  }

  const hideFailedDialog = () => {
    setIsFailed(false)
  }

  const showPasswords = () => {
    setIsVisible(!isVisible)
  }
  const onSubmitForm = (data) => {
    const {email, password} = data
    showLoadingDialog()
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        hideLoadingDialog()
        clearForm()
        showSuccessDialog()
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showFailedDialog()
        }
        hideLoadingDialog()
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
              placeholderTextColor={colors.grey}
              placeholder={"Enter your email"}
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

      <View style={{marginTop: 30}}>
        <Button title={"Sign up"} onPress={handleSubmit(onSubmitForm)} />
      </View>
      <SuccessDialog
        isVisible={isSuccess}
        title={"Great!\n Your account has been created successfully"}
        titleButton={"Go to Home"}
        onBackdropPress={hideSuccessDialog}
      />
      <FailedDialog
        isVisible={isFailed}
        title={"That email address is already in use!"}
        titleButton={"Back"}
        onPress={hideFailedDialog}
        onBackdropPress={hideFailedDialog}
      />
      <LoadingDialog
        isVisible={isLoading}
        onBackdropPress={hideLoadingDialog}
      />
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
  })

export default FormRegister
