import create from "zustand"
import { METRICS, JURISDICTIONS, JURISDICTION_COLORS } from "../constants"

const useOptionsStore = create((set) => ({
  metric: METRICS[0],
  metrics: METRICS,
  categories: JURISDICTIONS,
  selectedCategories: JURISDICTIONS,
  categoryColors: JURISDICTION_COLORS,
  setMetric: (metric) => set({ metric }),
  setMetrics: (options) => set({ options }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
}))

export default useOptionsStore
