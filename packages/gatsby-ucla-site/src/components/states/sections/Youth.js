import React from "react"
import Stack from "../../Stack"
import { Typography } from "@material-ui/core"

const Youth = ({ id, lang, data, ...props }) => {
  return (
    <Stack {...props}>
      <Typography variant="h3">{lang.title}</Typography>
    </Stack>
  )
}

Youth.propTypes = {}

export default Youth
