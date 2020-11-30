import { useStaticQuery, graphql } from "gatsby"

export default function useFacilitiesData() {
  const { allFacilities } = useStaticQuery(
    graphql`
      query {
        allFacilities {
          totalCount
          nodes {
            id
            name
            city
            state
            jurisdiction
            coords
            residents {
              confirmed
              deaths
              active
              confirmed_rate
              deaths_rate
              active_rate
              population
            }
            staff {
              confirmed
              deaths
              active
            }
          }
        }
      }
    `
  )
  return allFacilities
}
