export function defaultRage(path) {
  const result = []
  var d = new Date()
  d.setMonth(d.getMonth() - 1)
  var dd = String(d.getDate()).padStart(2, '0')
  var mm = String(d.getMonth() + 1).padStart(2, '0') // January is 0!
  var yyyy = d.getFullYear()
  result[0] = yyyy + '-' + mm + '-' + dd
  var today = new Date()
  dd = String(today.getDate()).padStart(2, '0')
  mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
  yyyy = today.getFullYear()

  result[1] = yyyy + '-' + mm + '-' + dd
  return result
}
