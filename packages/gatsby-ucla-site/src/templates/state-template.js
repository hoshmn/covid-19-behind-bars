import Layout from "gatsby-theme-hyperobjekt-core/src/components/layout"

import React from "react"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"

const StateTemplate = (props) => {
  console.log("state page", props)
  const { state, facilities } = props.pageContext
  return (
    <Layout
      pageContext={{
        frontmatter: {
          title: "state Page",
        },
      }}
    >
      <Typography variant="h2">{state}</Typography>
      <pre>{JSON.stringify(facilities, null, 2)}</pre>
    </Layout>
  )
}

StateTemplate.propTypes = {}

export default StateTemplate
