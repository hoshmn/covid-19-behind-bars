import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { graphql, navigate } from "gatsby"
import { Block, Layout } from "gatsby-theme-hyperobjekt-core"
import { AppBar, Grid, makeStyles, Typography } from "@material-ui/core"
import FacilitiesTable from "./facilities-table"
import NumberStat from "../stats/number-stat"
import { getDataByJurisdiction } from "../../common/utils/selectors"
import { useActiveMetric } from "../../common/hooks"
import StatList from "./StatList"
import MetricSelectionTitle from "../controls/MetricSelectionTitle"
import FacilitiesMap from "./FacilitiesMap"
import Stack from "../stack"
import { Step, Scrollama } from "react-scrollama"
import {
  ResidentsSummary,
  Facilities,
  Filings,
  Grassroots,
  Immigration,
  Releases,
  StaffSummary,
  Youth,
} from "./sections"
import useStatesStore from "./use-states-store"
import Visual from "./Visual"
import shallow from "zustand/shallow"
import SectionNavigation from "../SectionNavigation"

const useStyles = makeStyles((theme) => ({
  nav: {
    position: "sticky",
    top: theme.layout.headerHeight,
    padding: 0,
  },
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
  },
  step: {
    display: "flex",
    minHeight: `calc(100vh - ${theme.layout.headerHeight})`,
    justifyContent: "center",
  },
  first: {
    minHeight: `calc(100vh - ${theme.layout.headerHeight} - ${theme.spacing(
      10
    )})`,
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

const content = {
  sections: [
    {
      id: "residents",
      lang: {
        title: "Statewide ${metric} among incarcerated people",
        link: "Incarcerated People",
      },
    },
    {
      id: "staff",
      lang: { title: "Statewide ${metric} among staff", link: "Staff" },
    },
    {
      id: "facilities",
      lang: { title: "Facilities by ${metric}", link: "Facilities" },
    },
    {
      id: "filings",
      lang: {
        title: "Filings and Court Orders",
        link: "Filings & Court Orders",
      },
    },
    {
      id: "releases",
      lang: { title: "Prison and Jail Releases", link: "Releases" },
    },
    {
      id: "immigration",
      lang: { title: "Immigration Detention", link: "Immigration" },
    },
    { id: "youth", lang: { title: "Youth Incarceration", link: "Youth" } },
    {
      id: "grassroots",
      lang: {
        title: "Grassroots and Organizing Efforts",
        link: "Grassroots & Organizing",
      },
    },
  ],
}

const SECTION_COMPONENTS = {
  residents: ResidentsSummary,
  staff: StaffSummary,
  facilities: Facilities,
  filings: Filings,
  releases: Releases,
  immigration: Immigration,
  youth: Youth,
  grassroots: Grassroots,
}

const StateTemplate = ({ pageContext, data }) => {
  // classes used on this page
  const classes = useStyles()
  // pull state name from page context
  const { state } = pageContext
  // track current step index for scrollytelling
  const [currentStep, setCurrentStep] = useStatesStore(
    (state) => [state.currentStep, state.setCurrentStep],
    shallow
  )
  // update current step when entering
  const handleStepEnter = ({ data }) => {
    setCurrentStep(data)
  }

  const handleNavigation = (section) => {
    console.log("seciton", section)
    navigate("/#" + section)
    setCurrentStep(section)
  }

  // setctions for section nav
  const sections = content.sections.map((s) => ({
    id: s.id,
    name: s.lang.link,
  }))

  return (
    <Layout title={state}>
      <SectionNavigation
        current={currentStep}
        sections={sections}
        onSelect={handleNavigation}
      />

      <Block type="fullWidth" className={classes.block}>
        <Visual className={classes.visual} stateName={state} />
        <div className={classes.content}>
          <Scrollama onStepEnter={handleStepEnter}>
            {content.sections.map((section, index) => {
              const Component = SECTION_COMPONENTS[section.id]
              return (
                <Step key={section.id} data={section.id}>
                  <div>
                    {index === 0 && (
                      <Typography variant="h2" className={classes.title}>
                        {state}
                      </Typography>
                    )}
                    <Component
                      className={clsx(classes.step, {
                        [classes.first]: index === 0,
                      })}
                      data={data}
                      {...section}
                    />
                  </div>
                </Step>
              )
            })}
          </Scrollama>
        </div>
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
