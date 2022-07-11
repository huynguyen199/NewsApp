import * as rssParser from "react-native-rss-parser"

import {addArticle, getAllArticleUserForToday} from "../services/article"
import {formatDate, getFullToday} from "./date"

import {findCategoryIdByLink} from "../services/category"
import {findSourceIdByName} from "../services/source"
import {regexString} from "./regex"

const VNEXPRESS = "vn-express"
const SPORTS = "YbhZCdW477ujBlEvs3EJ"

const ENTERTAINMENT = "tbMgPmmLX8FVgZqO0oRn"
const BUSINESS = "7uJesSKRlMPyXRNX4QXi"
const TECHNOLOGY = "cVEilPJ0FUT3l98Cs49Y"
const GENERAL = "st5Al7HaP3YzkrX6tj0K"
const HEALTH = "uFSuK53zK69VAjLZUcbU"
const SCIENCE = "uJNeA0ubNm7r9CRIfUYK"

const logoRss =
  "https://media.istockphoto.com/vectors/rss-icon-vector-vector-id923565258?k=20&m=923565258&s=612x612&w=0&h=_WQz621hWqGe6rmAnT4XTmhhEnBzyPw3h9bB2NcneF8="

export const updateNewArticle = async (articleUserToday) => {
  addNewEntertainment(articleUserToday)
  addNewSports(articleUserToday)
  addNewBusiness(articleUserToday)
  addNewTechnology(articleUserToday)
  addNewGeneral(articleUserToday)
  addNewScience(articleUserToday)
  addNewHealth(articleUserToday)
}

const addNewSports = async (articleUserToday) => {
  const dataOfRss = await getItemAricleRssToday(
    "https://vnexpress.net/rss/the-thao.rss",
  )
  if (dataOfRss.length === 0) return

  const result = filterSameData(articleUserToday, dataOfRss)

  const checkEmpty = result.length === 0

  if (checkEmpty) {
    return
  }
  addAllArticle(result, SPORTS)
}

const addNewGeneral = async (articleUserToday) => {
  const dataOfRss = await getItemAricleRssToday(
    "https://vnexpress.net/rss/the-gioi.rss",
  )
  if (dataOfRss.length === 0) return

  const result = filterSameData(articleUserToday, dataOfRss)

  const checkEmpty = result.length === 0

  if (checkEmpty) {
    return
  }
  addAllArticle(result, GENERAL)
}

const addNewHealth = async (articleUserToday) => {
  const dataOfRss = await getItemAricleRssToday(
    "https://vnexpress.net/rss/suc-khoe.rss",
  )

  if (dataOfRss.length === 0) return

  const result = filterSameData(articleUserToday, dataOfRss)

  const checkEmpty = result.length === 0

  if (checkEmpty) {
    return
  }
  addAllArticle(result, HEALTH)
}

const addNewScience = async (articleUserToday) => {
  const dataOfRss = await getItemAricleRssToday(
    "https://vnexpress.net/rss/khoa-hoc.rss",
  )
  if (dataOfRss.length === 0) return

  const result = filterSameData(articleUserToday, dataOfRss)

  const checkEmpty = result.length === 0

  if (checkEmpty) {
    return
  }
  addAllArticle(result, SCIENCE)
}

const addNewBusiness = async (articleUserToday) => {
  const dataOfRss = await getItemAricleRssToday(
    "https://vnexpress.net/rss/kinh-doanh.rss",
  )
  if (dataOfRss.length === 0) return

  const result = filterSameData(articleUserToday, dataOfRss)

  const checkEmpty = result.length === 0

  if (checkEmpty) {
    return
  }
  addAllArticle(result, BUSINESS)
}

const addNewTechnology = async (articleUserToday) => {
  const dataOfRss = await getItemAricleRssToday(
    "https://vnexpress.net/rss/so-hoa.rss",
  )
  if (dataOfRss.length === 0) return

  const result = filterSameData(articleUserToday, dataOfRss)

  const checkEmpty = result.length === 0

  if (checkEmpty) {
    return
  }
  addAllArticle(result, TECHNOLOGY)
}
const addNewEntertainment = async (articleUserToday) => {
  const dataOfRss = await getItemAricleRssToday(
    "https://vnexpress.net/rss/giai-tri.rss",
  )
  if (dataOfRss.length === 0) return

  const result = filterSameData(articleUserToday, dataOfRss)

  const checkEmpty = result.length === 0

  if (checkEmpty) {
    return
  }
  addAllArticle(result, ENTERTAINMENT)
}

export const getItemAricleRssToday = async (url) => {
  return await fetch(url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      let articleRss = rss.items

      articleRss.sort(function (a, b) {
        var dateA = new Date(a.date),
          dateB = new Date(b.date)
        return dateA - dateB
      })
      articleRss = articleRss.filter((item) => {
        const fullToday = getFullToday()
        const dayOfAticle = formatDate(item.published)
        return fullToday === dayOfAticle
      })
      return articleRss
    })
}

export const getAricleRssToday = async (url) => {
  return await fetch(url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then(async (rss) => {
      let articleRss = rss.items

      articleRss.sort(function (a, b) {
        var dateA = new Date(a.date),
          dateB = new Date(b.date)
        return dateA - dateB
      })
      articleRss = articleRss.filter((item) => {
        const fullToday = getFullToday()
        const dayOfAticle = formatDate(item.published)
        return fullToday === dayOfAticle
      })
      return {res: rss, items: articleRss}
    })
}

const addAllArticle = async (arr, categoryId) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const data = {
      sourceId: VNEXPRESS,
      author: null,
      title: item.title,
      description: item.description.replace(regexString, ""),
      url: item.id,
      urlToImage: item.description.split('src="')[1].split('"')[0],
      content: null,
      publishedAt: new Date(item.published),
      categoryId: categoryId,
      userId: "default",
    }

    addArticle(data)
  }
}

const filterSameData = (articleUserToday, dataOfRss) => {
  const urlOfArticles = articleUserToday.map((item) => item.url)

  const result = dataOfRss.filter((item) => !urlOfArticles.includes(item.id))

  return result
}

export const addNewArticleFromUser = async (link, userId) => {
  const {res, items} = await getAricleRssToday(link)

  if (items.length === 0) return

  const title = res.image.title ?? res.title

  const categoryId = await findCategoryIdByLink(link)

  const sourceId = await findSourceIdByName(title)

  const result = await filterSameDataForUser(items, userId)

  const checkEmpty = result.length === 0

  if (checkEmpty) {
    return
  }
  return addArticleWithUser(result, categoryId, sourceId, userId, res)
}

const filterSameDataForUser = async (dataOfRss, userId) => {
  const articles = await getAllArticleUserForToday(userId)

  const urlOfArticles = articles.map((item) => item.url)

  const result = dataOfRss.filter((item) => !urlOfArticles.includes(item.id))

  return result
}

export const addArticleWithUser = (arr, categoryId, sourceId, userId, rss) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    const data = {
      sourceId,
      author: null,
      title: item.title,
      description: item.description.replace(regexString, ""),
      url: item.links[0].url,
      urlToImage: item.description.includes('src="')
        ? item.description.split('src="')[1].split('"')[0]
        : item.description.includes("src='")
        ? item.description.split("src='")[1].split("'")[0]
        : rss.image.url ?? logoRss,
      content: null,
      publishedAt: new Date(item.published),
      categoryId,
      userId,
    }

    addArticle(data)
  }
}
