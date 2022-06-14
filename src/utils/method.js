export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export const shortString = (title, length) => {
  return title.length > length ? title.substring(0, length) + "..." : title
}
