import React from "react"
import Stack from "../../Stack"
import { Typography } from "@material-ui/core"

const Grassroots = ({ id, lang, data, ...props }) => {
  return (
    <Stack {...props}>
      <Typography variant="h3">{lang.title}</Typography>
      {lang.body && (
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: lang.body }}
        />
      )}
    </Stack>
  )
}

Grassroots.propTypes = {}

export default Grassroots
