import { useMemo } from "react"
import useOptionsStore from "./use-options-store"
import useFacilitiesData from "./use-facilities-data"
import { typeSelector } from "./selectors"
export default function useSpikeData() {
  const { nodes } = useFacilitiesData()
  const selectedCategories = useOptionsStore(
    (state) => state.selectedCategories
  )
  return useMemo(
    () =>
      nodes.filter(
        (d) =>
          selectedCategories.indexOf(typeSelector(d)) > -1 &&
          !isNaN(d.coords[0]) &&
          !isNaN(d.coords[1])
      ),
    [nodes, selectedCategories]
  )
}
