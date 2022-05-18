import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native"
import React, {useEffect, useState} from "react"
import Header from "@components/header"
import LeftComponent from "./components/editProfile/leftComponent"
import fonts from "@assets/fonts"
import {useNavigation, useTheme} from "@react-navigation/native"
import Button from "@components/button"
import {useForm} from "react-hook-form"
import {launchImageLibrary} from "@utils/imagePicker"
import {Divider, Icon} from "@rneui/themed"
import useAuth from "@hooks/useAuth"
import {findUserById, updateUser} from "@services/user"
import {getImageByFileName, uploadImageByUri} from "@services/image"
import SuccessDialog from "@components/successDialog"
import LoadingDialog from "@components/loadingDialog"
import {homeTabs} from "@common/navigator"
import {Material} from "@common/icon"
import NameContainer from "./components/editProfile/nameContainer"
import PhoneContainer from "./components/editProfile/phoneContainer"
import EmailContainer from "./components/editProfile/emailContainer"
import AboutContainer from "./components/editProfile/aboutContainer"
import WebsiteContainer from "./components/editProfile/websiteContainer"

const EditProfile = () => {
  const {colors} = useTheme()
  const styles = makeStyles(colors)
  const {userInfo} = useAuth()
  const [profile, setProfile] = useState({})
  const navigation = useNavigation()
  const [image, setImage] = useState({
    uri: "https://espclarity.com/wp-content/uploads/2021/07/3rd-member.png",
    fileName: null,
  })
  const [dialog, setDialog] = useState({
    isSuccess: false,
    isLoading: false,
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      about: "",
      website: "",
    },
  })

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

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

  const fetchUser = async () => {
    if (userInfo) {
      const providerData = userInfo._user.providerData[0]
      const user = await findUserById(providerData.uid)
      // setLoading(false)
      setProfile(user)
    }
  }

  const fillData = () => {
    setValue("fullName", profile.fullName)
    setValue("phoneNumber", profile.phoneNumber)
    setValue("email", profile.email)
    setValue("about", profile.about)
    setValue("website", profile.about)
    setImage({...image, uri: profile.photoUrl})
  }

  const onSubmitUpdateProfile = async (data) => {
    showLoadingDialog()
    const userId = profile.id
    const photoUrl = image.fileName ? await uploadImage() : null
    let user
    if (photoUrl) {
      user = {...data, photoUrl}
    } else {
      user = data
    }

    updateUser(userId, user).then(() => {
      hideLoadingDialog()
      showSuccessDialog()
    })
  }

  const uploadImage = async () => {
    const task = await uploadImageByUri(image.uri, image.fileName)
    const fileName = task.metadata.fullPath
    const uri = await getImageByFileName(fileName)
    return uri
  }

  const onChooseImage = async () => {
    const res = await launchImageLibrary()
    const {uri, fileName} = getImages(res)
    setImage({uri, fileName})
  }

  const getImages = (res) => {
    const uri = res.assets[0].uri
    const fileName = res.assets[0].fileName
    return {uri, fileName}
  }

  const onMoveProfile = () => {
    navigation.navigate(homeTabs.me)
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} />

      <Header leftComponent={<LeftComponent />} />
      <ScrollView>
        <View style={styles.boxMargin}>
          <View style={styles.boxInfo}>
            <TouchableOpacity onPress={onChooseImage}>
              <ImageBackground
                source={{uri: image.uri}}
                imageStyle={styles.imageStyle}
                style={styles.styleBackground}>
                <View style={styles.imageChildStyle}>
                  <Icon
                    name={Material.edit}
                    type="material"
                    color={colors.lightRed}
                    reverse
                    size={10}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <Divider style={styles.styleDividerVertical} />
          <NameContainer control={control} errors={errors} />
          <PhoneContainer control={control} errors={errors} />
          <EmailContainer control={control} errors={errors} />
          <AboutContainer control={control} errors={errors} />
          <WebsiteContainer control={control} errors={errors} />

          <Button
            containerStyle={styles.buttonContainerStyle}
            onPress={handleSubmit(onSubmitUpdateProfile)}
            title={"Save Changes"}
          />
        </View>
        {/* dialog */}
        <SuccessDialog
          isVisible={dialog.isSuccess}
          title={"Update successfully"}
          titleButton={"See your profile"}
          onPress={onMoveProfile}
          onBackdropPress={hideSuccessDialog}
        />
        <LoadingDialog
          onBackdropPress={hideLoadingDialog}
          isVisible={dialog.isLoading}
        />
      </ScrollView>
    </View>
  )
}

const makeStyles = (colors) =>
  StyleSheet.create({
    buttonContainerStyle: {marginBottom: 20},
    styleDividerVertical: {marginVertical: 30},
    boxMargin: {marginHorizontal: 10},
    container: {flex: 1, marginTop: 30, backgroundColor: colors.white},
    imageChildStyle: {
      width: 20,
      height: 20,
      position: "absolute",
      bottom: 10,
      right: 10,
      borderRadius: 20,
    },
    imageStyle: {borderRadius: 120 / 2},
    styleBackground: {width: 120, height: 120},
    boxInfo: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    txtTitle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      marginLeft: 20,
    },
  })

export default EditProfile
