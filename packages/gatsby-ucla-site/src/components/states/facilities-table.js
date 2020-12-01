import React from "react"
import { Table } from "../table"
import { format } from "d3-format"
import { Typography, withStyles } from "@material-ui/core"
import { useMappableFacilities } from "../../common/hooks"
import {
  serifTypography,
  titleTypography,
} from "../../gatsby-theme-hyperobjekt-core/theme"
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
  name: {},
  table: {
    "& .MuiToolbar-regular": {
      justifyContent: "flex-start",
    },
    "& .MuiTableCell-head": {
      position: "relative",
      ...serifTypography,
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
    "& .MuiTablePagination-input, & .MuiTablePagination-spacer + .MuiTablePagination-caption": {
      display: "none",
    },
  },
})

const intFormatter = format(",d")

const countFormatter = (value) =>
  !isNumber(value) ? "Unavailable" : intFormatter(value)

const HomeTable = ({ classes, ...props }) => {
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
    <Table
      className={classes.table}
      columns={columns}
      options={options}
      {...props}
    ></Table>
  )
}

HomeTable.propTypes = {}

export default withStyles(styles)(HomeTable)
