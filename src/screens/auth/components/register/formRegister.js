import {View, StyleSheet} from "react-native"
import React, {useState} from "react"
import {useNavigation, useTheme} from "@react-navigation/native"
import EyeOffIcon from "./eyeOffIcon"
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
import {createUser, findUserById} from "@services/user"
import useAuth from "@hooks/useAuth"
import {mainStack} from "@common/navigator"

const FormRegister = () => {
  const [isVisible, setIsVisible] = useState(true)
  const {colors} = useTheme()
  const {userInfo} = useAuth()
  const navigation = useNavigation()
  const [dialog, setDialog] = useState({
    isSuccess: false,
    isFailed: false,
    isLoading: false,
  })

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
    // setIsLoading(true)
    setDialog((prev) => ({...prev, isLoading: true}))
  }

  const hideLoadingDialog = () => {
    // setIsLoading(false)
    setDialog((prev) => ({...prev, isLoading: false}))
  }

  const showSuccessDialog = () => {
    // setIsSuccess(true)
    setDialog((prev) => ({...prev, isSuccess: true}))
  }

  const hideSuccessDialog = () => {
    setDialog((prev) => ({...prev, isSuccess: false}))
  }

  const showFailedDialog = () => {
    // setIsFailed(true)
    setDialog((prev) => ({...prev, isFailed: true}))
  }

  const hideFailedDialog = () => {
    setDialog((prev) => ({...prev, isFailed: false}))
  }

  const showPasswords = () => {
    setIsVisible(!isVisible)
  }
  const onSubmitForm = (data) => {
    const {email, password} = data
    showLoadingDialog()
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        hideLoadingDialog()
        clearForm()
        showSuccessDialog()
        const providerData = res.user.providerData[0]
        createNewUserWithData(providerData)
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showFailedDialog()
        }
        hideLoadingDialog()
      })
  }

  const createNewUserWithData = (data) => {
    const user = {
      id: data.uid,
      fullName: data.displayName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      photoUrl: data.photoURL,
      interest: [],
      source: [],
      about: null,
      website: null,
    }
    createUser(user)
  }

  const onMoveHome = async () => {
    // console.log("test")
    // navigation.navigate(mainStack.source)
    hideSuccessDialog()
    const providerData = userInfo._user.providerData[0]
    const user = await findUserById(providerData.uid)

    if (user.interest.length === 0) {
      return navigation.navigate(mainStack.source)
    }
    return navigation.navigate(mainStack.homeTab)
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
      <HelperText
        isVisible={errors.email && errors.email.message}
        title={errors.email && errors.email.message}
        style={styles.styleEmailHelper}
      />
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
      <HelperText
        isVisible={errors.password && errors.password.message}
        title={errors.password && errors.password.message}
        style={styles.stylePasswordHelper}
      />

      <View style={styles.boxButtonSignUp}>
        <Button title={"Sign up"} onPress={handleSubmit(onSubmitForm)} />
      </View>
      <SuccessDialog
        isVisible={dialog.isSuccess}
        title={"Great!\n Your account has been created successfully"}
        titleButton={"Go to Home"}
        onPress={onMoveHome}
        onBackdropPress={hideSuccessDialog}
      />
      <FailedDialog
        isVisible={dialog.isFailed}
        title={"That email address is already in use!"}
        titleButton={"Back"}
        onPress={hideFailedDialog}
        onBackdropPress={hideFailedDialog}
      />
      <LoadingDialog
        isVisible={dialog.isLoading}
        onBackdropPress={hideLoadingDialog}
      />
    </>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    boxButtonSignUp: {marginTop: 30},
    inputPassword: {marginTop: 5},
    boxHelperPassword: {height: 30, marginTop: 3},
    boxHelperEmail: {height: 28, marginTop: 3},
    inputEmail: {marginTop: 5},
    styleEmail: {marginTop: 5},
    stylePasswordHelper: {},
    styleEmailHelper: {},
  })

export default FormRegister
