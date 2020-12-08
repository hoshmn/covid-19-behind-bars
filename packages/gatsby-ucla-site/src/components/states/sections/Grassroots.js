import React from "react"
import PropTypes from "prop-types"
import Stack from "../../stack"
import { Typography } from "@material-ui/core"

const Grassroots = ({ id, lang, data, ...props }) => {
  return (
    <Stack id={id} {...props}>
      <Typography variant="h3">{lang.title}</Typography>
    </Stack>
  )
}

Grassroots.propTypes = {}

export default Grassroots
