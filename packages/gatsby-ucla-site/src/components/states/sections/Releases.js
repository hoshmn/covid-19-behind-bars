import React from "react"
import PropTypes from "prop-types"
import Stack from "../../stack"
import { Typography } from "@material-ui/core"

const Releases = ({ id, lang, data, ...props }) => {
  return (
    <Stack id={id} {...props}>
      <Typography variant="h3">{lang.title}</Typography>
    </Stack>
  )
}

Releases.propTypes = {}

export default Releases
