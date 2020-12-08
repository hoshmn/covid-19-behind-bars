import React from "react"
import Stack from "../../Stack"
import { Typography } from "@material-ui/core"

const Releases = ({ id, lang, data, ...props }) => {
  return (
    <Stack {...props}>
      <Typography variant="h3">{lang.title}</Typography>
    </Stack>
  )
}

Releases.propTypes = {}

export default Releases
