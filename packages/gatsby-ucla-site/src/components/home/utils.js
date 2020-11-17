const getComparator = (dataSelector) => (a, b) => {
  const aVal = dataSelector(a)
  const bVal = dataSelector(b)
  if (isNaN(aVal)) return -1
  if (isNaN(bVal)) return 1
  if (aVal < bVal) return -1
  if (aVal > bVal) return 1
  return 0
}

export const getTopValues = (data, dataSelector, top = 5) => {
  if (!data) return []
  const compare = getComparator(dataSelector)
  return data.sort(compare).reverse().slice(0, top)
}
