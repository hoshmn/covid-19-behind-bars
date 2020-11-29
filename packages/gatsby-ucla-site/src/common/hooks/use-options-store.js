import create from "zustand"

const useOptionsStore = create((set) => ({
  metric: "confirmed",
  metrics: ["confirmed", "deaths"],
  categories: ["state", "federal", "county"],
  selectedCategories: ["state", "federal", "county"],
  categoryColors: ["#CA7F26", "#6BA084", "#758EAC"],
  setMetric: (metric) => set({ metric }),
  setMetrics: (options) => set({ options }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
}))

export default useOptionsStore
