const metadata = require("./config/metadata.json")
const coreOptions = require("./config/core.json")
module.exports = {
  siteMetadata: metadata,
  plugins: [
    {
      resolve: `gatsby-theme-hyperobjekt-core`,
      options: {
        ...coreOptions,
        typekitId: "uiz8duz",
        templates: {
          home: require.resolve("./src/components/home/home.js"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `COVID-19 Behind Bars`,
        short_name: `COVID Behind Bars`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#cccccc`,
        display: `minimal-ui`,
        icon: `content/assets/site-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `./src/cms/cms.js`,
      },
    },
  ],
}
