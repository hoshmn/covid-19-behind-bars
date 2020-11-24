import React from "react"
import { Table } from "../table"
import { format } from "d3-format"
import { Typography } from "@material-ui/core"
import { useSpikeData } from "../../common/hooks"

const intFormatter = format(",d")

const countFormatter = (value) =>
  isNaN(value) ? "Unavailable" : intFormatter(value)

const HomeTable = (props) => {
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
        Header: "Deaths",
        accessor: "Residents.Deaths",
        Cell: (prop) => countFormatter(prop.value),
        style: {
          width: 120,
          maxWidth: 120,
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
  return <Table data={spikes} columns={columns} options={options}></Table>
}

HomeTable.propTypes = {}

export default HomeTable
