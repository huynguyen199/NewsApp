import firestore, {firebase} from "@react-native-firebase/firestore"

export const articleCollection = firestore().collection("article")

export const addArticle = (data) => {
  firestore()
    .collection("article")
    .add(data)
    .then(() => {})
}

export const getAllArticle = async () => {
  const data = []

  const querySnapshot = await firestore()
    .collection("article")
    .orderBy("publishedAt", "desc")
    .get()

  querySnapshot.forEach((documentSnapshot) => {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    })
  })

  return data
}

export const getArtcileByArrayTitle = async (arr) => {
  const data = []

  const querySnapshot = await firestore()
    .collection("article")
    .where("title", "in", arr)
    .get()
  querySnapshot.forEach((documentSnapshot) => {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    })
  })

  return data
}

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

export const findArticleByTitle = async (search) => {
  let data = []

  const querySearch = await firestore()
    .collection("article")
    .where("title", ">=", search)
    .where("title", "<=", search + "\uf8ff")
    .get()

  querySearch.forEach((documentSnapshot) => {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    })
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
