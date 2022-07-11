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

export const addSource = (data) => {
  firestore()
    .collection("source")
    .add(data)
    .then(() => {})
}

export const checkSourceExistsByName = async (name) => {
  return await firestore()
    .collection("source")
    .where("name", "in", [name])
    .get()
    .then((querySnapshot) => querySnapshot.docs.length > 0)
}

export const findSourceIdByName = async (name) => {
  const querySnapshot = await firestore()
    .collection("source")
    .where("name", "==", name)
    .get()
  let id
  querySnapshot.forEach((documentSnapshot) => {
    id = documentSnapshot.id
  })
  return id
  // return category
}
