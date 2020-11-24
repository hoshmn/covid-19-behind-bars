import { useCallback } from "react"
import useOptionsStore from "./use-options-store"
import { getDataMetricSelector } from "../utils"

export default function useDataSelector() {
  const metric = useOptionsStore((state) => state.metric)
  return useCallback(getDataMetricSelector(metric), [metric])
}
