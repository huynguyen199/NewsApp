import firestore, {firebase} from "@react-native-firebase/firestore"

import {getFullToday} from "../utils/date"

export const articleCollection = firestore().collection("article")

export const addArticle = (data) => {
  firestore().collection("article").add(data)
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
  let data = null
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

export const getOneLastestArticle = async () => {
  let data = null

  const querySnapshot = await firestore()
    .collection("article")
    .orderBy("publishedAt", "desc")
    .where("userId", "==", "default")
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

export const getAllArticleUserForToday = async (userId) => {
  let query = articleCollection
  const data = []
  const today = getFullToday()

  if (userId) {
    query = query.where("userId", "==", userId)
  } else {
    query = query.where("userId", "==", "default")
  }
  // tbMgPmmLX8FVgZqO0oRn
  const querySnapshot = await query
    .where("publishedAt", ">=", new Date(today))
    .get()

  querySnapshot.forEach((documentSnapshot) => {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    })
  })

  return data
}
