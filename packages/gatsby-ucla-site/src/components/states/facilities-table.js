import React from "react"
import { Table } from "../table"
import { format } from "d3-format"
import { Typography, withStyles } from "@material-ui/core"
import { titleTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import { isNumber } from "../../common/utils/selectors"
import { getLang } from "../../common/utils/i18n"
import { formatMetricValue } from "../../common/utils/formatters"

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
    "& .MuiTablePagination-input, & .MuiTablePagination-spacer + .MuiTablePagination-caption": {
      display: "none",
    },
  },
})

const intFormatter = format(",d")

const countFormatter = (value) =>
  !isNumber(value) ? "Unavailable" : intFormatter(value)

const FacilitiesTable = ({
  classes,
  group = "residents",
  metric,
  ...props
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Facility",
        accessor: "name",
        disableSortBy: true,
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
          minWidth: "50%",
        },
      },
      {
        id: "residents." + metric,
        Header: getLang("residents"),
        accessor: "residents." + metric,
        Cell: (prop) => {
          return formatMetricValue(prop.value, metric)
        },
        style: {
          width: 136,
          maxWidth: 136,
          textAlign: "right",
        },
      },
      {
        id: "staff." + metric,
        Header: `${getLang("staff")}`,
        accessor: "staff." + metric,
        Cell: (prop) => {
          return formatMetricValue(prop.value, metric)
        },
        style: {
          width: 136,
          maxWidth: 136,
          textAlign: "right",
        },
      },
    ],
    [classes.name, metric, group]
  )
  const options = React.useMemo(
    () => ({
      initialState: {
        pageSize: 5,
        sortBy: [{ id: group + "." + metric, desc: true }],
      },
    }),
    [metric, group]
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

FacilitiesTable.propTypes = {}

export default withStyles(styles)(FacilitiesTable)
