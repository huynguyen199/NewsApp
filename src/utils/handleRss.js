import * as rssParser from "react-native-rss-parser"

import {addArticle, getAllArticle} from "../services/article"

import {findCategoryIdByLink} from "../services/category"
import {findSourceIdByName} from "../services/source"
import firestore from "@react-native-firebase/firestore"

const ENTERTAINMENT = "tbMgPmmLX8FVgZqO0oRn"
const BUSINESS = "7uJesSKRlMPyXRNX4QXi"
const SPORTS = "YbhZCdW477ujBlEvs3EJ"
const TECHNOLOGY = "cVEilPJ0FUT3l98Cs49Y"
const GENERAL = "st5Al7HaP3YzkrX6tj0K"
const HEALTH = "uFSuK53zK69VAjLZUcbU"
const SCIENCE = "uJNeA0ubNm7r9CRIfUYK"

const logoRss =
  "https://media.istockphoto.com/vectors/rss-icon-vector-vector-id923565258?k=20&m=923565258&s=612x612&w=0&h=_WQz621hWqGe6rmAnT4XTmhhEnBzyPw3h9bB2NcneF8="

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

export const addNewArticle = async (link, categoryId, sourceId, userId) => {
  await fetch(link)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const result = await filterSameDataForUser(rss.items, userId)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      return addArticleWithUser(result, categoryId, sourceId, userId, rss)
    })
}

export const addNewArticleFromUser = async (link, userId) => {
  await fetch(link)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      const title = rss.image.title ?? rss.title
      const categoryId = await findCategoryIdByLink(link)
      const sourceId = await findSourceIdByName(title)

      const result = await filterSameDataForUser(rss.items, userId)

      const checkEmpty = result.length === 0

      if (checkEmpty) {
        return
      }
      return addArticleWithUser(result, categoryId, sourceId, userId, rss)
    })
}

const addArticleWithUser = async (arr, categoryId, sourceId, userId, rss) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    const data = {
      sourceId,
      author: null,
      title: item.title,
      description: item.description.replace(regExString, ""),
      url: item.links[0].url,
      urlToImage: item.description.includes('src="')
        ? item.description.split('src="')[1].split('"')[0]
        : item.description.includes("src='")
        ? item.description.split("src='")[1].split("'")[0]
        : rss.image.url ?? logoRss,
      content: null,
      publishedAt: new Date(),
      categoryId,
      userId,
    }

    await addArticle(data)
  }
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

const filterSameDataForUser = async (items, userId) => {
  const articles = await getAllArticle()
  const articlesOfUser = articles.filter((item) => item.userId === userId)
  const urlOfArticles = articlesOfUser.map((item) => item.url)

  const result = await items.filter((item) => !urlOfArticles.includes(item.id))

  return result
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
      publishedAt: new Date(),
      categoryId: categoryId,
      userId: null,
    }

    addArticle(data)
  })
  //   console.log("done")
}

export const checkArticleOldAndDelete = () => {
  const dateAfter15days = new Date()
  dateAfter15days.setDate(dateAfter15days.getDate() - 1)
  const articleRef = firestore()
    .collection("article")
    .where("publishedAt", "<", dateAfter15days)

  articleRef.get().then((querySnapshot) => {
    Promise.all(querySnapshot.docs.map((d) => d.ref.delete()))
  })
}

export const fetchRss = async (uri) => {
  return await fetch(uri)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => rss)
}
