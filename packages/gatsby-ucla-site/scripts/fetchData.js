if (typeof fetch !== "function") {
  global.fetch = require("node-fetch")
}
const { csv: fetchCsv, text: fetchText } = require("d3-fetch")
const { csvParse } = require("d3-dsv")
const { groups } = require("d3-array")
const {
  parseFacility,
  parseMap,
  exactMatch,
  roughMatch,
} = require(`./parseData.js`)
const US_STATES = require("../data/us_states.json")

async function getData(url, parser) {
  return await fetchCsv(url, parser)
}

/**
 * FACILITY DATA (CASES / DEATHS / ACTIVE, ETC)
 */

const facilitiesCsv = `https://raw.githubusercontent.com/uclalawcovid19behindbars/data/master/Adult%20Facility%20Counts/adult_facility_covid_counts_today_latest.csv`

exports.getFacilities = () => getData(facilitiesCsv, parseFacility)

/**
 * PRISON / JAIL RELEASES
 *
 * ISSUES:
 * - unsure about column to use for "transparency"
 * - how to pull jurisdiction from releases?
 */

const prisonReleases = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=845601985&format=csv`
const jailReleases = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=1678228533&format=csv`

const releasesMap = {
  facility: ["Facility", "string", exactMatch],
  state: ["State", "string", exactMatch],
  releases: ["Overall Pop. Reduction", "int", roughMatch],
  capacity: ["Known Capacity", "int", roughMatch],
  source: ["Source(s)", "string", roughMatch],
}

const releaseParser = (row) => parseMap(row, releasesMap)

// exports.getReleases = () =>
//   Promise.all([
//     getData(jailReleases, releaseParser),
//     getData(prisonReleases, releaseParser),
//   ])
exports.getJailReleases = () => getData(jailReleases, releaseParser)
exports.getPrisonReleases = () => getData(prisonReleases, releaseParser)

/**
 * COURT FILINGS / ORDERS
 */

const filingsOrdersCsv = `https://docs.google.com/spreadsheets/d/1L_lVGAf-G1VRgi-7a_pFhkTNPRi89MfMjT9E_Gjxiac/export?gid=393515537&format=csv`

const selectCourtName = (key, colName, row) => {
  // use 'Federal Court Name' if it has a value, if not use 'State Court Name'
  if (roughMatch(key, colName)) {
    return row[key] ? key : "State Court Name"
  }
  return false
}

const filingsOrdersMap = {
  case: ["Case Citation", "string", roughMatch],
  facility: ["Name of Facility", "string", roughMatch],
  state: ["State or Territory", "string", roughMatch],
  court: ["Federal Court Name", "string", selectCourtName],
  granted: ["Release Granted", "string", roughMatch],
}

const filingsOrdersParser = (row) => parseMap(row, filingsOrdersMap)

exports.getFilingsOrders = () =>
  fetchText(filingsOrdersCsv).then((d) => {
    const dataIndex = d.indexOf("Case Citation,Practice Area,Relief Requested")
    const lines = d.substring(dataIndex)
    const rows = csvParse(lines, filingsOrdersParser)
    const byState = groups(rows, (d) => d.state)
    const result = byState.map((stateGroup) => {
      const stateData = stateGroup[1]
      const facilityCount = groups(stateData, (d) => d.facility).length
      const courtCount = groups(stateData, (d) => d.court).length
      return {
        state: stateGroup[0],
        total: stateData.length,
        facilityCount,
        courtCount,
        granted: stateData.filter((d) => d.granted.toLowerCase() === "yes")
          .length,
      }
    })
    return result
  })

/**
 * IMMIGRATION DETENTION CASES
 */

const immigrationCsv = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=278828877&format=csv`

const immigrationMap = {
  facility: ["facility", "string", exactMatch],
  state: ["State", "string", exactMatch],
  fieldOffice: ["ICE Field Office", "string", roughMatch],
  cases: ["TOTAL Confirmed Cases - ICE DATA (Detainees)", "int", exactMatch],
  deaths: ["Confirmed Deaths - ICE DATA (Detainees)", "int", exactMatch],
}

const immigrationParser = (row) => {
  // facility column has no header, so fix that before parsing
  row["facility"] = row[""] ? row[""] : ""
  return parseMap(row, immigrationMap)
}

exports.getImmigrationCases = () =>
  getData(immigrationCsv, immigrationParser).then((d) => {
    // remove rows without state value or marked as total
    const result = d.filter(
      (d) => !!d.state && d.facility.toLowerCase().indexOf("total:") === -1
    )
    return result
  })

/**
 * IMMIGRATION FILINGS
 */

const immigrationFilingsCsv = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=22612814&format=csv`

const immigrationFilingsMap = {
  facility: ["Facility", "string", roughMatch],
  state: ["State", "string", exactMatch],
  lung: ["Lung Conditions", "string", roughMatch],
  heart: ["Heart Conditions", "string", roughMatch],
  substance: ["Substance Abuse History", "string", roughMatch],
  cancer: ["Cancer", "string", roughMatch],
  diabetes: ["Diabetes", "string", roughMatch],
  medication: ["Immuno- suppressant Medication", "string", roughMatch],
  smoking: ["History of Smoking", "string", roughMatch],
  other: ["Other Risk Factor(s)", "string", roughMatch],
}

const immigrationFilingsParser = (row) => parseMap(row, immigrationFilingsMap)

exports.getImmigrationFilings = () =>
  // fetch text because top rows are not headers
  fetchText(immigrationFilingsCsv).then((d) => {
    const dataIndex = d.indexOf("Unique ID (internal use only)")
    // pull test from the start of the column headers
    const lines = d.substring(dataIndex)
    // parse the csv and change state abbreviation to name
    const result = csvParse(lines, immigrationFilingsParser).map((r) => ({
      ...r,
      state: US_STATES[r.state],
    }))
    return result
  })

/**
 * YOUTH INCARCERATION
 */

const youthCsv = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=771710274&format=csv`

const youthFilingsMap = {
  facility: ["Name of Facility", "string", roughMatch],
  state: ["State", "string", exactMatch],
  city: ["City", "string", exactMatch],
  county: ["County", "string", exactMatch],
  cases_youth: ["Cases (Youth)", "int", roughMatch],
  cases_staff: ["Cases (Staff)", "int", roughMatch],
}

const youthParser = (row) => parseMap(row, youthFilingsMap)

exports.getYouth = () =>
  getData(youthCsv, youthParser).then((data) => {
    // remove total row
    const result = data.filter((d) => d.state.toLowerCase() !== "total")
    return result
  })

/**
 * GRASSROOTS
 */

const grassrootsCsv = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=1720501154&format=csv`

const grassrootsMap = {
  facility: ["Target Facility", "string", roughMatch],
  state: ["State", "string", exactMatch],
  county: ["County", "string", exactMatch],
  organization: ["Organization", "string", exactMatch],
  type: ["Organizing Effort", "string", exactMatch],
  internal_effort: ["Internal Organizing Effort", "string", roughMatch],
  external_effort: ["External Organizing Effort", "string", roughMatch],
  sanitary: ["Effort for Improved Sanitary Conditions", "string", roughMatch],
  releases: [
    "Effort for Immediate or Accelerated Releases",
    "string",
    roughMatch,
  ],
  testing: ["Effort for New/Improved Testing Procedures", "string", roughMatch],
  response: ["Response (if yes or partially)", "string", roughMatch],
  success: ["Demands Met?", "string", roughMatch],
}

const grassrootsParser = (row) => parseMap(row, grassrootsMap)

const valueToBool = (value) => value.trim().toLowerCase() === "x"

exports.getGrassroots = () =>
  getData(grassrootsCsv, grassrootsParser).then((data) => {
    const booleanCols = [
      "internal_effort",
      "external_effort",
      "sanitary",
      "releases",
      "testing",
    ]
    const result = data.map((d) => {
      return {
        ...d,
        ...booleanCols.reduce((obj, curr) => {
          obj[curr] = valueToBool(d[curr])
          return obj
        }, {}),
      }
    })
    return result
  })

/**
 * FUNDRAISERS
 */

const fundraisersCsv = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=903902194&format=csv`

const fundraisersMap = {
  state: ["State", "string", exactMatch],
  organization: ["Organization", "string", exactMatch],
  goal: ["Goal", "string", exactMatch],
  date: ["Date", "string", roughMatch],
  ongoing: ["Ongoing", "string", roughMatch],
  sources: ["Sources", "string", roughMatch],
  fundraiser: ["Fundraiser", "string", roughMatch],
}

const fundraisersParser = (row) => parseMap(row, fundraisersMap)

exports.getFundraisers = () => getData(fundraisersCsv, fundraisersParser)

/**
 * RESOURCES
 */

const resourcesCsv = `https://docs.google.com/spreadsheets/d/1X6uJkXXS-O6eePLxw2e4JeRtM41uPZ2eRcOA_HkPVTk/export?gid=1126533660&format=csv`

const resourcesMap = {
  category: ["Category", "string", exactMatch],
  organization: ["Organization", "string", exactMatch],
  links: ["Link(s)", "string", exactMatch],
  description: ["Description", "string", exactMatch],
}

const resourcesParser = (row) => parseMap(row, resourcesMap)

exports.getResources = () =>
  getData(resourcesCsv, resourcesParser).then((data) => {
    data = data.map((d) => {
      d.links = d.links
        // break links into an array,
        .split(" ")
        // filter out links that do not start with http
        .filter((link) => link.indexOf("http") === 0)
        // remove semicolon from end of links
        .map((link) =>
          link[link.length - 1] === ";" ? link.substr(0, link.length - 1) : link
        )
      return d
    })
    return data
  })
