import React from "react"
import { Table } from "../table"
import { format } from "d3-format"
import { Container, Typography, withStyles } from "@material-ui/core"
import { useMappableFacilities } from "../../common/hooks"
import { Block } from "gatsby-theme-hyperobjekt-core"
import {
  sansSerifyTypography,
  serifTypography,
  titleTypography,
} from "../../gatsby-theme-hyperobjekt-core/theme"
import ResponsiveContainer from "../responsive-container"
import { isNumber } from "../../common/utils/selectors"

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
  name: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: 224,
    [theme.breakpoints.up(1440)]: {
      maxWidth: 320,
    },
  },
  table: {
    "& .MuiTableCell-head": {
      position: "relative",
      ...sansSerifyTypography,
      fontWeight: 700,
      lineHeight: 1.2,
      overflow: "hidden",
    },
    "& .MuiTableCell-head .MuiTableSortLabel-root": {
      position: "absolute",
      right: 0,
      transform: `translateX(4px)`,
      top: 0,
      bottom: 0,
    },
    "& .MuiTableSortLabel-icon": {
      fontSize: 12,
    },
    "& .MuiTablePagination-spacer": {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
  },
})

const intFormatter = format(",d")
const perFormatter = format(".0%")

const countFormatter = (value) =>
  !isNumber(value) ? "Unavailable" : intFormatter(value)

const activeFormatter = (value) =>
  !isNumber(value) ? "Unavailable" : intFormatter(value * Math.random())

const rateFormatter = (value) =>
  !isNumber(value)
    ? "Unavailable"
    : perFormatter(value / (value + value * Math.random()))

const HomeTable = ({ classes, ...props }) => {
  const data = useMappableFacilities()
  const columns = React.useMemo(
    () => [
      {
        Header: "Facility",
        accessor: "name",
        Cell: (prop) => {
          return (
            <>
              <Typography className={classes.name} variant="body1">
                {prop.value}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {prop.row.original.state}
              </Typography>
            </>
          )
        },
        style: {
          minWidth: 224,
        },
      },
      {
        id: "cases",
        Header: "Total Cases",
        accessor: "residents.confirmed",
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
        accessor: "residents.confirmed",
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
        accessor: "residents.confirmed",
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
        accessor: "residents.confirmed",
        Cell: (prop) => rateFormatter(prop.value),
        style: {
          width: 156,
          maxWidth: 156,
          textAlign: "right",
        },
      },
      {
        Header: "Deaths",
        accessor: "residents.deaths",
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
        accessor: "residents.deaths",
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
        sortBy: [{ id: "residents.confirmed", desc: true }],
      },
    }),
    []
  )
  return (
    <Block type="fullWidth" className={classes.root}>
      <ResponsiveContainer>
        <Typography className={classes.title} variant="h3">
          Facilities with the <span>highest</span> counts
        </Typography>
        <Table
          className={classes.table}
          data={data}
          columns={columns}
          options={options}
        ></Table>
      </ResponsiveContainer>
    </Block>
  )
}

HomeTable.propTypes = {}

export default withStyles(styles)(HomeTable)
