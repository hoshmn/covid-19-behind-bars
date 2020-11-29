/**
 * Abbreviations that should be forced to uppercase
 */
const UPPER_CASE = [
  "fci",
  "usp",
  "ccw",
  "cw",
  "cc",
  "ci",
  "cf",
  "ciw",
  "cim",
  "cvsp",
  "col",
  "atc",
  "mcc",
  "pdc",
  "mci",
  "smcc",
  "mdc",
  "crv",
  "iwp",
  "sbwc",
  "fmc",
  "li",
  "sq",
  "ca",
  "prc",
  "fsp",
  "llc",
  "rcc",
  "cmf",
  "dvi",
  "cmc",
  "svsp",
  "crc",
  "nwfrc",
  "ii",
  "sfrc",
  "fdc",
  "gdcp",
  "smu",
  "rci",
  "wci",
  "nbci",
  "asp",
  "cs",
  "imcc",
]

/**
 * Fixes casing on strings THAT ARE ALL UPPERCASE
 * so that They Have Title Casing
 * @param {string} str
 */
function fixCasing(str) {
  if (!str) return "Unknown"
  const result = str
    .toLowerCase()
    .replace(/\b\w/g, (v) => v.toString(v).toUpperCase())
    .split(" ")
    .map((v) =>
      UPPER_CASE.indexOf(v.toLowerCase()) > -1 ? v.toUpperCase() : v
    )
    .join(" ")
  return result
}

/**
 * Splits any keys with a "." into a nested object
 * @param {*} data
 */
const groupObjectData = (data) =>
  Object.keys(data).reduce((obj, key) => {
    if (key.indexOf(".") > -1) {
      const [group, ...rest] = key.split(".")
      const first = group.toLowerCase()
      const second = rest.map((r) => r.toLowerCase()).join(".")
      if (!obj.hasOwnProperty(first)) obj[first] = {}
      obj[first][second] = data[key]
    } else {
      obj[key.toLowerCase()] = data[key]
    }
    return obj
  }, {})

/**
 * Parses a facility object
 * @param {*} facility
 */
exports.parseFacility = (facility = {}) => {
  const source = groupObjectData(facility)

  const residentKeys = [
    "confirmed",
    "deaths",
    "active",
    "population",
    "released",
    "recovered",
  ]
  const staffKeys = ["confirmed", "deaths", "active", "recovered"]

  const result = {}

  result.name = fixCasing(source.name)
  result.jurisdiction = source["jurisdiction"]
  result.city = source["city"]
  result.state = source["state"]
  result.date = Date.parse(source["date"])

  // parse coordinates
  const Latitude = parseFloat(source["latitude"])
  const Longitude = parseFloat(source["longitude"])
  result.coords = [Longitude, Latitude]

  // parse residents data
  result.residents = residentKeys.reduce((obj, key) => {
    obj[key] = parseInt(source.residents[key])
    return obj
  }, {})

  // parse staff data
  result.staff = staffKeys.reduce((obj, key) => {
    obj[key] = parseInt(source.staff[key])
    return obj
  }, {})

  return result
}
