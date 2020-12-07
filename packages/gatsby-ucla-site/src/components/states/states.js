import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { Block, Layout } from "gatsby-theme-hyperobjekt-core"
import { Grid, makeStyles, Typography } from "@material-ui/core"
import Stack from "../stack"
import FacilitiesTable from "./facilities-table"
import NumberStat from "../stats/number-stat"

import HealthJustice from "../../../content/assets/health-justice-logo.png"
import { getDataByJurisdiction } from "../../common/utils/selectors"
import { useActiveMetric } from "../../common/hooks"
import StatList from "./StatList"
import { Step, Scrollama } from "react-scrollama"
import MetricSelectionTitle from "../controls/MetricSelectionTitle"
import FacilitiesMap from "./FacilitiesMap"
import { GROUPS } from "../../common/constants"

// const sumTotal = (data, accessor) =>
//   data.reduce(
//     (value, current) =>
//       !isNaN(accessor(current)) ? value + accessor(current) : value,
//     0
//   )

const useStyles = makeStyles((theme) => ({
  block: {
    padding: theme.spacing(0, 2),
    alignItems: "flex-start",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 3),
    },
  },
  visual: {
    position: "sticky",
    top: theme.layout.headerHeight,
    width: `calc(100% - 26.25rem)`,
    height: `calc(100vh - ${theme.layout.headerHeight})`,
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    "& svg": { flex: 1 },
  },
  title: {
    marginTop: theme.spacing(5),
    "& + $step": {
      minHeight: `calc(100vh - ${theme.layout.headerHeight} - ${theme.spacing(
        10
      )})`,
    },
  },
  step: {
    minHeight: `calc(100vh - ${theme.layout.headerHeight})`,
    justifyContent: "center",
  },
  content: {
    marginTop: `calc(-100vh + ${theme.layout.headerHeight})`,
    position: "relative",
    maxWidth: "26.25rem",
  },
}))

const STEPS = {
  RESIDENTS: 0,
  STAFF: 1,
  FACILITIES: 2,
  FILINGS: 3,
  RELEASES: 4,
  IMMIGRATION: 5,
  YOUTH: 6,
  GRASSROOTS: 7,
}

const StateTemplate = ({ pageContext, data }) => {
  // classes used on this page
  const classes = useStyles()
  // pull state name from page context
  const { state } = pageContext
  // track current step index for scrollytelling
  const [currentStepIndex, setCurrentStepIndex] = useState(null)
  // track group to show for map
  const [facilitiesGroup, setFacilitiesGroup] = useState("residents")
  // metric to show for map
  const metric = useActiveMetric()
  // filter for map data to only show current state
  const mapFilter = (f) => f.state === state
  // data for all facilities in the state
  const all = data.allFacilities.edges.map((d) => d.node)
  // jurisdiction totals for the state
  const summary = getDataByJurisdiction(all)

  // update current step when entering
  const handleStepEnter = ({ data }) => {
    setCurrentStepIndex(data)
  }

  // handler for when table headers are clicked
  const handleFacilitiesGroupChange = React.useCallback(
    (newGroup) => {
      const group = newGroup.split(".")[0]
      // exit if invalid
      if (!group || GROUPS.indexOf(group) === -1) return
      group && group !== facilitiesGroup && setFacilitiesGroup(group)
    },
    [facilitiesGroup, setFacilitiesGroup]
  )

  // getter for the map group based on step
  const getMapGroup = () => {
    if (currentStepIndex === STEPS["STAFF"]) return "staff"
    if (currentStepIndex === STEPS["FACILITIES"]) return facilitiesGroup
    return "residents"
  }

  // step activation updates
  useEffect(() => {}, [currentStepIndex])

  return (
    <Layout title={state}>
      <Block type="fullWidth" className={classes.block}>
        <div className={classes.visual}>
          <FacilitiesMap
            height={800}
            width={700}
            stateName={state}
            filter={mapFilter}
            group={getMapGroup()}
            metric={metric}
          />
        </div>
        <Stack className={classes.content} spacing={0}>
          <Typography variant="h2" className={classes.title}>
            {state}
          </Typography>
          <Scrollama onStepEnter={handleStepEnter}>
            <Step data={STEPS["RESIDENTS"]}>
              <div>
                <Stack className={classes.step}>
                  <StatList
                    title="Total ${metric} among incarcerated people"
                    metric={metric}
                    group="residents"
                    groupData={summary["residents"]}
                  />
                </Stack>
              </div>
            </Step>
            <Step data={STEPS["STAFF"]}>
              <div>
                <Stack className={classes.step}>
                  <StatList
                    title="Total ${metric} among staff"
                    metric={metric}
                    group="staff"
                    groupData={summary["staff"]}
                  />
                </Stack>
              </div>
            </Step>
            <Step data={STEPS["FACILITIES"]}>
              <div>
                <Stack className={classes.step}>
                  <MetricSelectionTitle title="Facilities by ${metric}" />
                  <FacilitiesTable
                    metric={metric}
                    group={facilitiesGroup}
                    data={all}
                    onSort={handleFacilitiesGroupChange}
                  />
                </Stack>
              </div>
            </Step>
            <Step data={STEPS["FILINGS"]}>
              <div>
                <Stack className={classes.step}>
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
              </div>
            </Step>
            <Step data={STEPS["RELEASES"]}>
              <div>
                <Stack className={classes.step}>
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
                      <NumberStat
                        value="18"
                        label="people released from jail"
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </div>
            </Step>
            <Step data={STEPS["IMMIGRATION"]}>
              <div>
                <Stack className={classes.step}>
                  <Typography variant="h3">Immigration Detention</Typography>
                </Stack>
              </div>
            </Step>
            <Step data={STEPS["YOUTH"]}>
              <div>
                <Stack className={classes.step}>
                  <Typography variant="h3">Youth Incarceration</Typography>
                </Stack>
              </div>
            </Step>
            <Step data={STEPS["GRASSROOTS"]}>
              <div>
                <Stack className={classes.step}>
                  <Typography variant="h3">
                    Grassroots and Organizing Efforts
                  </Typography>
                </Stack>
              </div>
            </Step>
          </Scrollama>
        </Stack>
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
