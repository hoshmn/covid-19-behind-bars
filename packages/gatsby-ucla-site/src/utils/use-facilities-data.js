import { useStaticQuery, graphql } from "gatsby"
import { parseFacility } from "./parsers"

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
              Deaths
              Population
              Confirmed
              Negative
              Pending
              Quarantine
              Released
              Recovered
              Tested
            }
            Staff {
              Confirmed
              Deaths
              Negative
              Pending
              Quarantine
              Recovered
              Tested
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
