const StateTemplate = require.resolve(`./src/templates/state-template.js`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allFacilitiesCsv {
        group(field: State) {
          fieldValue
          nodes {
            id
            Name
            Facility
            Latitude
            Longitude
            Date
            State
            County {
              FIPS
            }
            City
            Address
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
          }
        }
      }
    }
  `)

  const states = result.data.allFacilitiesCsv.group
  states.forEach(({ fieldValue: stateName, nodes: facilities }) => {
    const pageName = stateName.toLowerCase()
    createPage({
      path: `/states/${pageName}/`,
      component: StateTemplate,
      context: {
        slug: pageName,
        state: stateName,
        facilities: facilities,
      },
    })
  })
}
