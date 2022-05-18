import firestore, {firebase} from "@react-native-firebase/firestore"

export const getFirstOfSource = async () => {
  let data
  const querySnapshot = await firestore()
    .collection("article")
    .orderBy("publishedAt", "desc")
    .limit(1)
    .get()

  querySnapshot.forEach((documentSnapshot) => {
    data = {
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    }
  })
  return data
}

export const findArticleById = async (id) => {
  const querySnapshot = await firestore()
    .collection("article")
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
