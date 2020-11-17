export const getUniqueValues = (nodes, selector) => {
  return nodes
    .map(selector)
    .reduce(
      (vals, curr) => (vals.indexOf(curr) > -1 ? vals : [...vals, curr]),
      []
    )
}

// selector for spike length
export const getDataMetricSelector = (metric) => {
  return (d) => d.Residents[metric]
}

// selector for spike color
export const typeSelector = (d) => d.Facility

// selectory for spike width
export const widthSelector = (d) => d.PopulationCount
