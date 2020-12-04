import React from "react"
import { graphql } from "gatsby"
import { Block, Layout } from "gatsby-theme-hyperobjekt-core"
import { Grid, makeStyles, Typography } from "@material-ui/core"
import Stack from "../stack"
import MapGradients from "../maps/map-gradients"
import StateMap from "../maps/state-map/state-map"
import FacilitiesMarkerLayer from "../maps/marker-layer/facilities-marker-layer"

import GroupStats from "./group_stats"
import ResponsiveContainer from "../responsive-container"
import Table from "./facilities-table"
import NumberStat from "../stats/number-stat"

import HealthJustice from "../../../content/assets/health-justice-logo.png"
import { getDataByJurisdiction } from "../../common/utils/selectors"

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

const StateTemplate = ({ pageContext, data }) => {
  const { state } = pageContext
  const classes = useStyles()
  const mapFilter = (f) => f.state === state
  const all = data.allFacilities.edges.map((d) => d.node)
  const summary = getDataByJurisdiction(all)

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

export const query = graphql`
  query($state: String!) {
    allFacilities(filter: { state: { eq: $state } }) {
      edges {
        node {
          id
          name
          coords
          city
          jurisdiction
          residents {
            active
            active_rate
            confirmed
            confirmed_rate
            deaths
            deaths_rate
            population
          }
          staff {
            active
            confirmed
            deaths
          }
          date
        }
      }
    }
    allFilings(filter: { state: { eq: $state } }) {
      edges {
        node {
          courtCount
          facilityCount
          granted
          total
        }
      }
    }
    allFundraisers(filter: { state: { eq: $state } }) {
      edges {
        node {
          ongoing
          goal
          fundraiser
          date
          organization
          sources
        }
      }
    }
    allGrassroots(filter: { state: { eq: $state } }) {
      edges {
        node {
          county
          external_effort
          facility
          internal_effort
          organization
          releases
          response
          sanitary
          success
          testing
          type
        }
      }
    }
    allImmigrationCases(filter: { state: { eq: $state } }) {
      edges {
        node {
          cases
          deaths
          facility
          fieldOffice
        }
      }
    }
    allImmigrationFilings(filter: { state: { eq: $state } }) {
      edges {
        node {
          cancer
          diabetes
          heart
          facility
          lung
          medication
          other
          smoking
          substance
        }
      }
    }
    allReleases(filter: { state: { eq: $state } }) {
      edges {
        node {
          facility
          capacity
          releases
          source
        }
      }
    }
    allYouth(filter: { state: { eq: $state } }) {
      edges {
        node {
          cases_staff
          cases_youth
          city
          county
          facility
        }
      }
    }
  }
`

export default StateTemplate
