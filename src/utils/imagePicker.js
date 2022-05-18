import {PermissionsAndroid} from "react-native"
import * as ImagePicker from "react-native-image-picker"

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message: "App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err)
  }
}

export const launchImageLibrary = () => {
  // mediaType: "photo"
  requestCameraPermission()
  let options = {
    title: "Select Photo",
    cameraType: "back",
    includeExtra: true,
  }

  return ImagePicker.launchImageLibrary(options, (response) => {
    console.log("Response = ", response)

    if (response.didCancel) {
    } else if (response.error) {
    } else if (response.customButton) {
    }
  })
}
