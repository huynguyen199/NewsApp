import firestore, {firebase} from "@react-native-firebase/firestore"

export const getALlSources = async () => {
  const data = []
  const querySnapshot = await firestore().collection("source").get()

  querySnapshot.forEach((documentSnapshot) => {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    })
  })
  return data
}

export const findSourceById = async (id) => {
  const querySnapshot = await firestore()
    .collection("source")
    .where(firebase.firestore.FieldPath.documentId(), "==", id)
    .get()
  let source

  querySnapshot.forEach((documentSnapshot) => {
    source = {
      id: documentSnapshot.id,
      ...documentSnapshot.data(),
    }
  })
  return source
}
