import { useMemo } from "react"
import { useFacilitiesData } from "../../common/hooks"
import { getData, getDataByJurisdiction } from "../../common/utils/selectors"

/**
 * Provides data for state level pages
 *
 * @param {*} state state name
 */
export default function useStateData(state) {
  const data = useFacilitiesData()
  return useMemo(() => {
    const stateData = data.filter((d) => getData(d, "state") === state)
    const groupsData = getDataByJurisdiction(stateData)
    return {
      all: stateData,
      summary: groupsData,
    }
  }, [data, state])
}
