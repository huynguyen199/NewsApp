import storage from "@react-native-firebase/storage"

export const uploadImageByUri = async (uri, fileName) => {
  const reference = storage().ref(fileName)

  const task = await reference.putFile(uri)
  return task
}

export const getImageByFileName = async (fileName) => {
  const url = await storage().ref(fileName).getDownloadURL()
  return url
}
