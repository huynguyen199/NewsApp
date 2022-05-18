import firestore, {firebase} from "@react-native-firebase/firestore"

export const addPost = async (data) => {
  firestore()
    .collection("post")
    .add(data)
    .then(() => {
      console.log("User added!")
    })
}

export const updatePost = async (id, data) => {
  await firestore()
    .collection("post")
    .doc(id)
    .update(data)
    .then(() => {
      console.log("Post updated!")
    })
}

export const deletePost = async (id) => {
  await firestore()
    .collection("post")
    .doc(id)
    .delete()
    .then(() => {
      console.log("User deleted!")
    })
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
