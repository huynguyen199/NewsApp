import firestore, {firebase} from "@react-native-firebase/firestore"

export const addPost = async (data) => {
  firestore()
    .collection("post")
    .add(data)
    .then(() => {})
}

export const updatePost = async (id, data) => {
  await firestore()
    .collection("post")
    .doc(id)
    .update(data)
    .then(() => {})
}

export const deletePost = async (id) => {
  await firestore()
    .collection("post")
    .doc(id)
    .delete()
    .then(() => {})
}

export const findPostById = async (id) => {
  const querySnapshot = await firestore()
    .collection("post")
    .where(firebase.firestore.FieldPath.documentId(), "==", id)
    .get()
  let article

  querySnapshot.forEach((documentSnapshot) => {
    article = {
      id: documentSnapshot.id,
      ...documentSnapshot.data(),
    }
  })
  return article
}

export const findPostByUserId = async (id) => {
  const article = []
  const querySnapshot = await firestore()
    .collection("post")
    .where("userId", "==", id)
    .get()

  querySnapshot.forEach((documentSnapshot) => {
    article.push({
      id: documentSnapshot.id,
      ...documentSnapshot.data(),
    })
  })

  return article
}
