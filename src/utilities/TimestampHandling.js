export const convertToDatetimeJsonString = timestamp => {
  let date = new Date(timestamp - 1000)

  return date.toISOString()
}
