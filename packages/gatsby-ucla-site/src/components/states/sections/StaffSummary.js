import React from "react"
import PropTypes from "prop-types"
import StatList from "../StatList"
import Stack from "../../stack"
import { getDataByJurisdiction } from "../../../common/utils/selectors"
import { useActiveMetric } from "../../../common/hooks"

const StaffSummary = ({ id, lang, data, ...props }) => {
  // data for all facilities in the state
  const all = data.allFacilities.edges.map((d) => d.node)
  // jurisdiction totals for the state
  const summary = getDataByJurisdiction(all)
  const metric = useActiveMetric()
  return (
    <Stack id={id} {...props}>
      <StatList
        title={lang.title}
        metric={metric}
        group="staff"
        groupData={summary["staff"]}
      />
    </Stack>
  )
}

StaffSummary.propTypes = {}

export default StaffSummary
