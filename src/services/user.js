import auth from "@react-native-firebase/auth"
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

export const checkLinkExistsUser = async (userId, link) => {
  return firestore()
    .collection("user")
    .where("id", "==", userId)
    .where("links", "array-contains", link)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.length > 0
    })
}

export const addLinksForUser = async (userId, link) => {
  await firestore()
    .collection("user")
    .doc(userId)
    .update({
      links: firestore.FieldValue.arrayUnion(link),
    })
}

export const getCurrentUserId = async () => {
  if (auth().currentUser) {
    const userId = auth().currentUser.providerData[0].uid
    return userId
  }

  return null
}

export const deleteLinkForUserByLink = async (userId, links) => {
  await firestore().collection("user").doc(userId).update({
    links: links,
  })
}
