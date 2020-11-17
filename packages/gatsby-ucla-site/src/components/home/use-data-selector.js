import { useCallback } from "react"
import { useOptionsStore } from "../../utils"
import { getDataMetricSelector } from "../../utils/selectors"

export default function useDataSelector() {
  const metric = useOptionsStore((state) => state.metric)
  return useCallback(getDataMetricSelector(metric), [metric])
}
