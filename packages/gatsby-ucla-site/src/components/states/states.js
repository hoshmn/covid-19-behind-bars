import React from "react"
import { Block, Layout } from "gatsby-theme-hyperobjekt-core"
import { Grid, makeStyles, Typography } from "@material-ui/core"
import Stack from "../stack"
import MapGradients from "../maps/map-gradients"
import StateMap from "../maps/state-map/state-map"
import FacilitiesMarkerLayer from "../maps/marker-layer/facilities-marker-layer"
import useStateData from "./use-state-data"

import GroupStats from "./group_stats"
import ResponsiveContainer from "../responsive-container"
import Table from "./facilities-table"
import NumberStat from "../stats/number-stat"

import HealthJustice from "../../../content/assets/health-justice-logo.png"

// const sumTotal = (data, accessor) =>
//   data.reduce(
//     (value, current) =>
//       !isNaN(accessor(current)) ? value + accessor(current) : value,
//     0
//   )

const useStyles = makeStyles((theme) => ({
  root: {},
  visual: {
    position: "sticky",
    top: theme.layout.headerHeight,
    maxWidth: `calc(100% - 420px)`,
    height: `calc(100vh - ${theme.layout.headerHeight}px)`,
    marginLeft: "auto",
    transform: `translateX(5%)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    "& svg": { flex: 1 },
  },
  section: {
    minHeight: `calc(100vh - ${theme.layout.headerHeight}px)`,
    justifyContent: "center",
  },
  content: {
    marginTop: `calc(-100vh + ${theme.layout.headerHeight}px)`,
    position: "relative",
    maxWidth: 420,
  },
}))

const StateTemplate = (props) => {
  const { state } = props.pageContext
  const { all, summary } = useStateData(state)
  const classes = useStyles()
  const mapFilter = (f) => f.state === state

  return (
    <Layout title={state}>
      <Block type="fullWidth">
        <ResponsiveContainer>
          <div className={classes.visual}>
            <StateMap height={800} width={700} stateName={state}>
              <MapGradients />
              <FacilitiesMarkerLayer
                filter={mapFilter}
                style={{ pointerEvents: "none" }}
              />
            </StateMap>
          </div>

          <Stack className={classes.content} spacing={3}>
            <Typography variant="h2">{state}</Typography>
            {Object.keys(summary).map((group) => (
              <GroupStats
                key={group}
                group={group}
                groupData={summary[group]}
              />
            ))}
            <Stack className={classes.section}>
              <Typography variant="h3">Facilities</Typography>
              <Table data={all} />
            </Stack>
            <Stack className={classes.section}>
              <Typography variant="h3">Filings and Court Orders</Typography>
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
            <Stack className={classes.section}>
              <Typography variant="h3">Prison and Jail Releases</Typography>
              <Typography variant="body1">
                Releases due to COVID-19 since March 15, 2020:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <NumberStat
                    value="125"
                    label="people released from prisons"
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumberStat value="18" label="people released from jail" />
                </Grid>
              </Grid>
            </Stack>
            <Stack className={classes.section}>
              <Typography variant="h3">Immigration Detention</Typography>
            </Stack>
            <Stack className={classes.section}>
              <Typography variant="h3">Youth Incarceration</Typography>
            </Stack>{" "}
            <Stack className={classes.section}>
              <Typography variant="h3">
                Grassroots and Organizing Efforts
              </Typography>
            </Stack>
          </Stack>
        </ResponsiveContainer>
      </Block>
    </Layout>
  )
}

StateTemplate.propTypes = {}

export default StateTemplate
