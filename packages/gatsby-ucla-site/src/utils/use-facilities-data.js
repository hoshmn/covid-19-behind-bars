import { useStaticQuery, graphql } from "gatsby"

export const parseFacility = (facility = {}) => {
  const result = { ...facility }

  // parse coordinates
  if (
    facility.hasOwnProperty("Latitude") &&
    facility.hasOwnProperty("Longitude")
  ) {
    result.Latitude = parseFloat(facility["Latitude"])
    result.Longitude = parseFloat(facility["Longitude"])
    result.coords = [result.Longitude, result.Latitude]
  }

  // parse residents data
  if (facility.hasOwnProperty("Residents")) {
    result.Residents = Object.keys(facility.Residents).reduce((obj, key) => {
      obj[key] = parseInt(facility.Residents[key])
      return obj
    }, {})
  }

  // parse staff data
  if (facility.hasOwnProperty("Staff")) {
    result.Staff = Object.keys(facility.Staff).reduce((obj, key) => {
      obj[key] = parseInt(facility.Staff[key])
      return obj
    }, {})
  }

  // parse population
  if (facility.hasOwnProperty("PopulationCount")) {
    result.PopulationCount = parseInt(facility.PopulationCount)
  }

  return result
}

export default function useFacilitiesData() {
  const { allFacilitiesCsv } = useStaticQuery(
    graphql`
      query {
        allFacilitiesCsv {
          totalCount
          nodes {
            Name
            Latitude
            Longitude
            Residents {
              Confirmed
              Deaths
            }
            State
            Facility
            PopulationCount
            id
          }
        }
      }
    `
  )
  return {
    ...allFacilitiesCsv,
    nodes: allFacilitiesCsv.nodes.map(parseFacility),
  }
}
