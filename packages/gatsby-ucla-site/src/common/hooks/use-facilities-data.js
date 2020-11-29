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
              population
            }
            staff {
              confirmed
              deaths
            }
          }
        }
      }
    `
  )
  return allFacilities
}
