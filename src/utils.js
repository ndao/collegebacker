function convertMaptoArray (map) {
  const result = []
  for (let [k, v] of map) {
    result.push(v)
  }

  return result
}

 module.exports = {
  convertMaptoArray
 }
