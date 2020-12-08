import React from "react"
import Stack from "../../Stack"
import { GROUPS } from "../../../common/constants"
import FacilitiesTable from "../FacilitiesTable"
import MetricSelectionTitle from "../../controls/MetricSelectionTitle"
import shallow from "zustand/shallow"
import useStatesStore from "../useStatesStore"
import { useActiveMetric } from "../../../common/hooks"

const Facilities = ({ id, lang, data, ...props }) => {
  const all = data.allFacilities.edges.map((d) => d.node)

  // currently selected metric
  const metric = useActiveMetric()

  // pull facilities group from the state page store
  const [facilitiesGroup, setFacilitiesGroup] = useStatesStore(
    (state) => [state.facilitiesGroup, state.setFacilitiesGroup],
    shallow
  )

  // handler for when table headers are clicked
  const handleFacilitiesGroupChange = React.useCallback(
    (newGroup) => {
      const group = newGroup.split(".")[0]
      console.log(group)
      // exit if invalid
      if (!group || GROUPS.indexOf(group) === -1) return
      group && group !== facilitiesGroup && setFacilitiesGroup(group)
    },
    [facilitiesGroup, setFacilitiesGroup]
  )
  return (
    <Stack {...props}>
      <MetricSelectionTitle title={lang.title} />
      <FacilitiesTable
        metric={metric}
        group={facilitiesGroup}
        data={all}
        onSort={handleFacilitiesGroupChange}
      />
    </Stack>
  )
}

Facilities.propTypes = {}

export default Facilities
