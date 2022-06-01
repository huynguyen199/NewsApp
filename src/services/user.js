import firestore from "@react-native-firebase/firestore"

export const getAllUser = async () => {
  const data = []
  const querySnapshot = await firestore().collection("user").get()

  querySnapshot.forEach((documentSnapshot) => {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    })
  })

  return data
}

export const findUserById = async (id) => {
  let user = null

  await firestore()
    .collection("user")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        user = documentSnapshot.data()
      })
    })
  return user
}

export const updateUser = async (id, data) => {
  await firestore()
    .collection("user")
    .doc(id)
    .update(data)
    .then(() => {})
}

export const checkUserExistByUid = async (uid) => {
  const user = await findUserById(uid)

  if (user) {
    return true
  }
  return false
}

export const createUser = async (data) => {
  firestore()
    .collection("user")
    .doc(data.id)
    .set(data)
    .then(() => {})
}
