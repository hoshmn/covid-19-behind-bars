import { Layout } from "gatsby-theme-hyperobjekt-core"

import React from "react"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"

const StateTemplate = (props) => {
  const { state, facilities } = props.pageContext
  return (
    <Layout title={state}>
      <Typography variant="h2">{state}</Typography>
      <pre>{JSON.stringify(facilities, null, 2)}</pre>
    </Layout>
  )
}

StateTemplate.propTypes = {}

export default StateTemplate
