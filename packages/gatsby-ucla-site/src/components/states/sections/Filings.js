import React from "react"
import Stack from "../../Stack"
import { Grid, Typography } from "@material-ui/core"
import HealthJustice from "../../../../content/assets/health-justice-logo.png"
import NumberStat from "../../stats/NumberStat"

const Filings = ({ id, lang, data, ...props }) => {
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

Filings.propTypes = {}

export default Filings
