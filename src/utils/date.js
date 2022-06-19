export const getFullToday = () => {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  var yyyy = today.getFullYear()

  return (today = mm + "/" + dd + "/" + yyyy)
}
export const formatDate = (date) => {
  const fullDate = new Date(date)
  const yyyy = fullDate.getFullYear()
  let mm = fullDate.getMonth() + 1 // Months start at 0!
  let dd = fullDate.getDate()

  if (dd < 10) dd = "0" + dd
  if (mm < 10) mm = "0" + mm

  const today = mm + "/" + dd + "/" + yyyy
  return today
}
