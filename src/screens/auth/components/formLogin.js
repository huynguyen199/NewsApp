import {View, Text, StyleSheet} from "react-native"
import React, {useEffect, useState} from "react"
import Label from "./label"
import HelperText from "@components/helperText"
import {useNavigation, useTheme} from "@react-navigation/native"
import Input from "@components/input"
import Button from "@components/button"
import EyeIcon from "./eyeIcon"
import EyeOffIcon from "./eyeOffIcon"
import CheckBox from "@react-native-community/checkbox"
import {Controller, useForm} from "react-hook-form"
import {mainStack} from "@common/navigator"
import useAuth from "@hooks/useAuth"
import {emailContraints, passwordContraints} from "@common/validator"
import auth from "@react-native-firebase/auth"
import SuccessDialog from "@components/successDialog"
import FailedDialog from "@components/failedDialog"
import {getObject, storeObject} from "@utils/AsyncStore"
import LoadingDialog from "@components/loadingDialog"
import fonts from "@assets/fonts"
import {findUserById} from "@services/user"

const FormLogin = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [dialog, setDialog] = useState({
    isSuccess: false,
    isFailed: false,
    isLoading: false,
  })
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const {userInfo} = useAuth()

  const navigation = useNavigation()

  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fillData = async () => {
    const user = await getObject("user")
    if (user) {
      setValue("email", user.email)
      setValue("password", user.password)
      setToggleCheckBox(Boolean(user))
    }
  }

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
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        hideLoadingDialog()
        clearForm()
        showSuccessDialog()
        if (toggleCheckBox) {
          storeObject("user", data)
        } else {
          storeObject("user", null)
        }
      })
      .catch((error) => {
        hideLoadingDialog()
        showFailedDialog()
      })
  }

  const onMoveHome = async () => {
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
      <Button title={"Sign in"} onPress={handleSubmit(onSubmitForm)} />
      {/* Dialog */}
      <SuccessDialog
        isVisible={dialog.isSuccess}
        title={"Logged in successfully"}
        titleButton={"Go to Home"}
        onPress={onMoveHome}
        onBackdropPress={hideSuccessDialog}
      />
      <FailedDialog
        isVisible={dialog.isFailed}
        title={"Login failed"}
        titleButton={"Go to Home"}
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
    inputPassword: {marginTop: 5},
    boxHelperPassword: {height: 30, marginTop: 3},
    boxHelperEmail: {height: 28, marginTop: 3},
    inputEmail: {marginTop: 5},
    styleEmail: {marginTop: 5},
    stylePasswordHelper: {},
    styleEmailHelper: {},
    txtTitle: {
      fontFamily: fonts.bold,
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
