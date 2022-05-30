import firestore from "@react-native-firebase/firestore"

export const bookmarkCollection = firestore().collection("bookmark")

export const getALlBookmark = async () => {
  const data = []
  const querySnapshot = await bookmarkCollection.orderBy("name", "asc").get()

  querySnapshot.forEach((documentSnapshot) => {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    })
  })

  return data
}

export const deleteBookmarkById = async (id) => {
  await firestore().collection("bookmark").doc(id).delete()
}

export const addBookmark = async (data) => {
  await bookmarkCollection.doc(data.id).set(data)
}
