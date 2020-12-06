import React from "react"
import { Table } from "../table"
import { format } from "d3-format"
import { fade, Typography, withStyles } from "@material-ui/core"
import { useMappableFacilities, useOptionsStore } from "../../common/hooks"
import { Block } from "gatsby-theme-hyperobjekt-core"
import {
  sansSerifyTypography,
  serifTypography,
} from "../../gatsby-theme-hyperobjekt-core/theme"
import ResponsiveContainer from "../responsive-container"
import { isNumber } from "../../common/utils/selectors"
import shallow from "zustand/shallow"
import { getLang } from "../../common/utils/i18n"
import MetricSelection from "../controls/MetricSelection"

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  title: {
    marginTop: 0,
    // TODO: refactor these styles so they are defined in one place instead of duplicated in home/map.js
    "& .MuiButtonBase-root": {
      ...serifTypography,
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(26),
      color: theme.palette.secondary.main,
      textTransform: "lowercase",
      border: `2px dotted transparent`,
      borderBottomColor: fade(theme.palette.text.secondary, 0.333),
      borderRadius: 5,
      position: "relative",
      top: "-0.15rem",
    },
  },
  name: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: 224,
    [theme.breakpoints.up(1440)]: {
      maxWidth: 320,
    },
  },
  table: {
    "& .MuiTableCell-root": {
      ...sansSerifyTypography,
    },
    "& .MuiTypography-root": {
      ...sansSerifyTypography,
    },
    "& .MuiTableCell-head": {
      position: "relative",
      ...sansSerifyTypography,
      fontWeight: 700,
      lineHeight: 1.2,
      overflow: "hidden",
      "&.tableCell--active": {
        boxShadow: `inset 0 -4px ${theme.palette.secondary.main}`,
        background: theme.palette.background.default,
      },
    },
    "& .MuiTableCell-head .MuiTableSortLabel-root": {
      position: "absolute",
      right: 0,
      transform: `translateX(4px)`,
      top: 0,
      bottom: 0,
      display: "none",
    },
    "& .MuiTableSortLabel-icon": {
      fontSize: 12,
    },
    "& .MuiTableCell-body.tableCell--active": {
      background: theme.palette.background.default,
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
  !isNumber(value) ? "--" : intFormatter(value)

const rateFormatter = (value) => (!isNumber(value) ? "--" : perFormatter(value))

const HomeTable = ({ classes, ...props }) => {
  const [metric, setMetric] = useOptionsStore(
    (state) => [state.metric, state.setMetric],
    shallow
  )
  const data = useMappableFacilities()
  const rateSorter = React.useCallback((a, b, columnId) => {
    const vals = [a, b].map((v) => v["original"]["residents"][columnId])
    if (isNumber(vals[0]) && !isNumber(vals[1])) return 1
    if (!isNumber(vals[0]) && isNumber(vals[1])) return -1
    if (!isNumber(vals[0]) && !isNumber(vals[1])) return 0
    const diff = vals[0] - vals[1]
    return diff < 0 ? -1 : 1
  }, [])
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
          width: "25%",
          minWidth: 260,
        },
      },
      {
        id: "confirmed",
        Header: getLang("confirmed"),
        accessor: "residents.confirmed",
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "12.5%",
          minWidth: 100,
          textAlign: "right",
        },
      },
      {
        id: "confirmed_rate",
        Header: getLang("confirmed_rate"),
        accessor: "residents.confirmed_rate",
        sortType: rateSorter,
        Cell: (prop) => rateFormatter(prop.value),
        style: {
          width: "12.5%",
          minWidth: 100,
          textAlign: "right",
        },
      },
      {
        id: "active",
        Header: getLang("active"),
        accessor: "residents.active",
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "12.5%",
          minWidth: 100,
          textAlign: "right",
        },
      },
      {
        id: "active_rate",
        Header: getLang("active_rate"),
        accessor: "residents.active_rate",
        sortType: rateSorter,

        Cell: (prop) => rateFormatter(prop.value),
        style: {
          width: "12.5%",
          minWidth: 100,
          textAlign: "right",
        },
      },
      {
        id: "deaths",
        Header: getLang("deaths"),
        accessor: "residents.deaths",
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: "12.5%",
          minWidth: 100,
          textAlign: "right",
        },
      },
      {
        id: "deaths_rate",
        Header: getLang("deaths_rate"),
        accessor: "residents.deaths_rate",
        sortType: rateSorter,

        Cell: (prop) => rateFormatter(prop.value),
        style: {
          width: "12.5%",
          minWidth: 100,
          textAlign: "right",
        },
      },
    ],
    [classes.name]
  )
  const options = React.useMemo(
    () => ({
      initialState: {
        pageSize: 5,
        sortBy: [{ id: metric, desc: true }],
      },
    }),
    []
  )

  const handleSortChange = React.useCallback(
    (sortBy) => {
      const newMetric = sortBy
      console.log("change metric", metric, newMetric)
      metric !== newMetric && setMetric(newMetric)
    },
    [metric]
  )
  return (
    <Block type="fullWidth" className={classes.root}>
      <ResponsiveContainer>
        <Typography className={classes.title} variant="h3">
          Facilities with the <span>highest</span> <MetricSelection />
        </Typography>
        <Table
          className={classes.table}
          data={data}
          columns={columns}
          options={options}
          sortColumn={metric}
          onSort={handleSortChange}
        ></Table>
      </ResponsiveContainer>
    </Block>
  )
}

HomeTable.propTypes = {}

export default withStyles(styles)(HomeTable)
