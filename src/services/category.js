import firestore, {firebase} from "@react-native-firebase/firestore"

export const addCategory = (data) => {
  firestore()
    .collection("category")
    .add(data)
    .then(() => {})
}

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

export const findCategoryIdByLink = async (link) => {
  const querySnapshot = await firestore()
    .collection("category")
    .where("url", "==", link)
    .get()
  let id
  querySnapshot.forEach((documentSnapshot) => {
    id = documentSnapshot.id
  })
  return id
  // return category
}

export const checkCategoryExist = async (name) => {
  return await firestore()
    .collection("category")
    .where("name", "in", [name])
    .get()
    .then((querySnapshot) => querySnapshot.docs.length > 0)
}
