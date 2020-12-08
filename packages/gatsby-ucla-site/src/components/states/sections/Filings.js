import React from "react"
import PropTypes from "prop-types"
import Stack from "../../stack"
import { Grid, Typography } from "@material-ui/core"
import HealthJustice from "../../../../content/assets/health-justice-logo.png"
import NumberStat from "../../stats/number-stat"

const Filings = ({ lang, data, ...props }) => {
  return (
    <Stack {...props}>
      <Typography variant="h3">{lang.title}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <NumberStat value="27" label="filings coded" />
        </Grid>
        <Grid item xs={6}>
          <NumberStat value="18" label="courts" />
        </Grid>
        <Grid item xs={6}>
          <NumberStat value="14" label="facilities" />
        </Grid>
        <Grid item xs={6}>
          <NumberStat value="72" label="compassionate releases" />
        </Grid>
        <Grid item xs={12}>
          <img
            style={{ maxWidth: 200, marginTop: 16 }}
            src={HealthJustice}
            alt="Health Justice"
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

Filings.propTypes = {}

export default Filings
