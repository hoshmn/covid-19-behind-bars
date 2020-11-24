const StateTemplate = require.resolve(`./src/templates/state-template.js`)

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

const validStatePages = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
].map(slugify)

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
          }
        }
      }
    }
  `)

  const states = result.data.allFacilitiesCsv.group
  states.forEach(({ fieldValue: stateName, nodes: facilities }) => {
    const pageName = slugify(stateName)
    if (validStatePages.indexOf(pageName) > -1) {
      createPage({
        path: `/states/${pageName}/`,
        component: StateTemplate,
        context: {
          slug: pageName,
          state: stateName,
          facilities: facilities,
        },
      })
    } else {
      console.warn(
        `invalid state name: not creating a state page for ${pageName} `
      )
    }
  })
}
