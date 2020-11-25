import React from "react"
import { Table } from "../table"
import { format } from "d3-format"
import { Container, Typography, withStyles } from "@material-ui/core"
import { useSpikeData } from "../../common/hooks"
import { Block } from "gatsby-theme-hyperobjekt-core"
import {
  serifTypography,
  titleTypography,
} from "../../gatsby-theme-hyperobjekt-core/theme"

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(38),
    maxWidth: "14em",
    marginTop: 0,
    "& span": {
      color: theme.palette.secondary.main,
    },
  },
  table: {
    overflow: "hidden",
    "& .MuiTableCell-head": {
      position: "relative",
      ...serifTypography,
    },
    "& .MuiTableCell-head .MuiTableSortLabel-root": {
      position: "absolute",
      right: 0,
      transform: `translateX(12px)`,
      top: 0,
      bottom: 0,
    },
  },
})

const intFormatter = format(",d")
const perFormatter = format(".0%")

const countFormatter = (value) =>
  isNaN(value) ? "Unavailable" : intFormatter(value)

const activeFormatter = (value) =>
  isNaN(value) ? "Unavailable" : intFormatter(value * Math.random())

const rateFormatter = (value) =>
  isNaN(value)
    ? "Unavailable"
    : perFormatter(value / (value + value * Math.random()))

const HomeTable = ({ classes, ...props }) => {
  const spikes = useSpikeData()
  const columns = React.useMemo(
    () => [
      {
        Header: "Facility",
        accessor: "Name",
        Cell: (prop) => {
          return (
            <>
              <Typography variant="body1">{prop.value}</Typography>
              <Typography variant="body2" color="textSecondary">
                {prop.row.original.State}
              </Typography>
            </>
          )
        },
      },
      {
        id: "cases",
        Header: "Total Cases",
        accessor: "Residents.Confirmed",
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: 136,
          maxWidth: 136,
          textAlign: "right",
        },
      },
      {
        id: "infected",
        Header: "Total % Infected",
        accessor: "Residents.Confirmed",
        Cell: (prop) => rateFormatter(prop.value),
        style: {
          width: 158,
          maxWidth: 158,
          textAlign: "right",
        },
      },
      {
        id: "activeCases",
        Header: "Active Cases",
        accessor: "Residents.Confirmed",
        Cell: (prop) => activeFormatter(prop.value),
        style: {
          width: 136,
          maxWidth: 136,
          textAlign: "right",
        },
      },
      {
        id: "activeInfected",
        Header: "Active % Infected",
        accessor: "Residents.Confirmed",
        Cell: (prop) => rateFormatter(prop.value),
        style: {
          width: 156,
          maxWidth: 156,
          textAlign: "right",
        },
      },
      {
        Header: "Deaths",
        accessor: "Residents.Deaths",
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: 120,
          maxWidth: 120,
          textAlign: "right",
        },
      },
      {
        id: "deathRate",
        Header: "% Resident Deaths",
        accessor: "Residents.Deaths",
        Cell: (prop) => rateFormatter(prop.value),
        style: {
          width: 156,
          maxWidth: 156,
          textAlign: "right",
        },
      },
    ],
    []
  )
  const options = React.useMemo(
    () => ({
      initialState: {
        pageSize: 5,
        sortBy: [{ id: "Residents.Confirmed", desc: true }],
      },
    }),
    []
  )
  return (
    <Block type="fullWidth" className={classes.root}>
      <Container maxWidth="lg">
        <Typography className={classes.title} variant="h3">
          Facilities with the <span>highest</span> counts
        </Typography>
        <Table
          className={classes.table}
          data={spikes}
          columns={columns}
          options={options}
        ></Table>
      </Container>
    </Block>
  )
}

HomeTable.propTypes = {}

export default withStyles(styles)(HomeTable)
