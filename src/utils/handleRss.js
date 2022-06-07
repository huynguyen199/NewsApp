import * as rssParser from "react-native-rss-parser"

import {addArticle, getAllArticle} from "../services/article"

import firestore from "@react-native-firebase/firestore"

const ENTERTAINMENT = "tbMgPmmLX8FVgZqO0oRn"
const BUSINESS = "7uJesSKRlMPyXRNX4QXi"
const SPORTS = "YbhZCdW477ujBlEvs3EJ"
const TECHNOLOGY = "cVEilPJ0FUT3l98Cs49Y"
const GENERAL = "st5Al7HaP3YzkrX6tj0K"
const HEALTH = "uFSuK53zK69VAjLZUcbU"
const SCIENCE = "uJNeA0ubNm7r9CRIfUYK"

const VNEXPRESS = "vn-express"
const regExString = /(<([^>]+)>)/gi

export const handleRssForVnExpress = async () => {
  await addNewEntertainment()
  await addNewSports()
  await addNewBusiness()
  await addNewTechnology()
  await addNewGeneral()
  await addNewScience()
  await addNewHealth()
  await checkArticleOldAndDelete()
}

export const addNewScience = async () => {
  await fetch("https://vnexpress.net/rss/khoa-hoc.rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const result = await filterSameData(rss.items)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      addAllArticle(result, SCIENCE)
    })
}

export const addNewHealth = async () => {
  await fetch("https://vnexpress.net/rss/suc-khoe.rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const result = await filterSameData(rss.items)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      addAllArticle(result, HEALTH)
    })
}

export const addNewGeneral = async () => {
  await fetch("https://vnexpress.net/rss/the-gioi.rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const result = await filterSameData(rss.items)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      addAllArticle(result, GENERAL)
    })
}

export const addNewTechnology = async () => {
  await fetch("https://vnexpress.net/rss/so-hoa.rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const result = await filterSameData(rss.items)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      addAllArticle(result, TECHNOLOGY)
    })
}

export const addNewEntertainment = async () => {
  await fetch("https://vnexpress.net/rss/giai-tri.rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const result = await filterSameData(rss.items)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      addAllArticle(result, ENTERTAINMENT)
    })
}

export const addNewBusiness = async () => {
  await fetch("https://vnexpress.net/rss/kinh-doanh.rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const result = await filterSameData(rss.items)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      addAllArticle(result, BUSINESS)
    })
}

export const addNewSports = async () => {
  await fetch("https://vnexpress.net/rss/the-thao.rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const result = await filterSameData(rss.items)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      addAllArticle(result, SPORTS)
    })
}

const filterSameData = async (items) => {
  const articles = await getAllArticle()
  const urlOfArticles = articles.map((item) => item.url)

  const result = await items.filter((item) => !urlOfArticles.includes(item.id))
  return result
}

const addAllArticle = async (arr, categoryId) => {
  // const categories
  arr.forEach((item) => {
    const data = {
      sourceId: VNEXPRESS,
      author: null,
      title: item.title,
      description: item.description.replace(regExString, ""),
      url: item.id,
      urlToImage: item.description.split('src="')[1].split('"')[0],
      content: null,
      publishedAt: new Date(item.published),
      categoryId: categoryId,
    }

    addArticle(data)
  })
  //   console.log("done")
}

export const checkArticleOldAndDelete = () => {
  const dateAfter15days = new Date()
  dateAfter15days.setDate(dateAfter15days.getDate() - 15)
  const articleRef = firestore()
    .collection("article")
    .where("publishedAt", "<", dateAfter15days)

  articleRef.get().then((querySnapshot) => {
    Promise.all(querySnapshot.docs.map((d) => d.ref.delete()))
  })
}
