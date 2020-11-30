import { useMemo } from "react"
import useOptionsStore from "./use-options-store"
import useFacilitiesData from "./use-facilities-data"
import { typeSelector } from "../utils"
import { isNumber } from "../utils/selectors"
export default function useMappableFacilities() {
  const { nodes } = useFacilitiesData()
  const selectedCategories = useOptionsStore(
    (state) => state.selectedCategories
  )
  return useMemo(
    () =>
      nodes.filter(
        (d) =>
          selectedCategories.indexOf(typeSelector(d)) > -1 &&
          isNumber(d.coords[0]) &&
          isNumber(d.coords[1])
      ),
    [nodes, selectedCategories]
  )
}
