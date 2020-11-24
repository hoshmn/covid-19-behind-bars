import React from "react"
import { Layout } from "gatsby-theme-hyperobjekt-core"
import { Typography } from "@material-ui/core"
import NumberStat from "../components/stats/number-stat"
import { format } from "d3-format"
import Stack from "../components/stack"
import StateMap from "../components/map/state-map/state-map"
import { useFacilitiesData } from "../common/hooks"

const sumTotal = (data, accessor) =>
  data.reduce(
    (value, current) =>
      !isNaN(accessor(current)) ? value + accessor(current) : value,
    0
  )

const numFormat = format(",d")

const StateTemplate = (props) => {
  const { state } = props.pageContext
  const data = useFacilitiesData()
  const stateData = data.nodes.filter((d) => d.State === state)
  const cases = sumTotal(stateData, (d) => d.Residents.Confirmed)
  const deaths = sumTotal(stateData, (d) => d.Residents.Deaths)
  const staffCases = sumTotal(stateData, (d) => d.Staff.Confirmed)
  const staffDeaths = sumTotal(stateData, (d) => d.Staff.Deaths)
  return (
    <Layout title={state}>
      <StateMap stateName={state} />
      <Stack spacing={3}>
        <Typography variant="h2">{state}</Typography>
        <Stack spacing={2}>
          <NumberStat value={numFormat(cases)} label="residents infected" />
          <NumberStat
            value={numFormat(deaths)}
            label="deaths among residents"
          />
          <NumberStat value={numFormat(staffCases)} label="staff infected" />
          <NumberStat
            value={numFormat(staffDeaths)}
            label="deaths among staff"
          />
        </Stack>
        <Typography variant="h3">Facilities</Typography>
        <Typography variant="h3">Population Reduction</Typography>
        <Typography variant="h3">Immigration Detention Facilities</Typography>
        <Typography variant="h3">Grassroots and Organizing Efforts</Typography>
      </Stack>
    </Layout>
  )
}

StateTemplate.propTypes = {}

export default StateTemplate
