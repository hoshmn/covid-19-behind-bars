import STATE_CENTERS from "../data/us_state_centers"

export const getUniqueValues = (nodes, selector) => {
  return nodes
    .map(selector)
    .reduce(
      (vals, curr) => (vals.indexOf(curr) > -1 ? vals : [...vals, curr]),
      []
    )
}

// selector for spike length
export const getDataMetricSelector = (metric) => {
  return (d) => d.Residents[metric]
}

// selector for spike color
export const typeSelector = (d) => d.Facility

// selectory for spike width
export const widthSelector = (d) => d.PopulationCount

/**
 * Gets a comparator function for the given data selector
 */
const getComparator = (dataSelector) => (a, b) => {
  const aVal = dataSelector(a)
  const bVal = dataSelector(b)
  if (isNaN(aVal)) return -1
  if (isNaN(bVal)) return 1
  if (aVal < bVal) return -1
  if (aVal > bVal) return 1
  return 0
}

/**
 * Gets the top values in the data set using a given data selector function
 * @param {*} data
 * @param {*} dataSelector
 * @param {*} top
 */
export const getTopValues = (data, dataSelector, top = 5) => {
  if (!data) return []
  const compare = getComparator(dataSelector)
  return data.sort(compare).reverse().slice(0, top)
}

/**
 * Returns a 2 letter state code, given the state name
 * @param {*} stateName
 */
export const getStateCodeByName = (stateName) => {
  const toLower = (v) => v.toLowerCase()
  return Object.keys(STATE_CENTERS).find(
    (key) =>
      toLower(STATE_CENTERS[key].State) === toLower(stateName) ||
      toLower(STATE_CENTERS[key].StateCode) === toLower(stateName)
  )
}

/**
 * Returns the state center data, given a state name or state code
 * @param {*} stateId
 */
export const getStateCenter = (stateId) => {
  const code = getStateCodeByName(stateId)
  if (code) return STATE_CENTERS[code]
  throw new Error(`State not found for provided code: ${code}`)
}
