import firestore, {firebase} from "@react-native-firebase/firestore"

export const getALlCategory = async () => {
  const data = []
  const querySnapshot = await firestore()
    .collection("category")
    .orderBy("name", "asc")
    .get()

  querySnapshot.forEach((documentSnapshot) => {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    })
  })

  return data
}

export const findCategoryById = async (id) => {
  const querySnapshot = await firestore()
    .collection("category")
    .where(firebase.firestore.FieldPath.documentId(), "==", id)
    .get()
  let category

  querySnapshot.forEach((documentSnapshot) => {
    category = {
      id: documentSnapshot.id,
      ...documentSnapshot.data(),
    }
  })
  return category
}
