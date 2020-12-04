import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function useGroupedStateData() {
  const data = useStaticQuery(graphql`
    {
      allFilings {
        edges {
          node {
            courtCount
            facilityCount
            granted
            state
            total
          }
        }
      }
      allFundraisers {
        group(field: state) {
          nodes {
            state
            sources
            organization
            ongoing
            fundraiser
            goal
            id
          }
          fieldValue
        }
      }
      allGrassroots {
        group(field: state) {
          fieldValue
          nodes {
            county
            external_effort
            internal_effort
            facility
            releases
            response
            sanitary
            state
            success
            testing
            type
          }
        }
      }
      allImmigrationCases {
        group(field: state) {
          fieldValue
          nodes {
            cases
            deaths
            facility
            fieldOffice
            state
            id
          }
        }
      }
      allImmigrationFilings {
        group(field: state) {
          fieldValue
          nodes {
            id
            cancer
            diabetes
            facility
            heart
            lung
            medication
            other
            smoking
            state
            substance
          }
        }
      }
      allReleases {
        group(field: state) {
          nodes {
            source
            state
            releases
            facility
            capacity
          }
        }
      }
      allFacilities {
        group(field: state) {
          fieldValue
          nodes {
            jurisdiction
            name
            residents {
              active
              active_rate
              confirmed
              confirmed_rate
              deaths
              deaths_rate
              population
            }
            coords
            city
            date
            staff {
              active
              confirmed
              deaths
              recovered
            }
            state
          }
        }
      }
      allYouth {
        group(field: state) {
          fieldValue
          nodes {
            cases_staff
            cases_youth
            city
            county
            facility
            state
          }
        }
      }
    }
  `)
  return data
}

export default useGroupedStateData
