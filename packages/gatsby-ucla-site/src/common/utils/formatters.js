import { METRIC_FORMATTERS } from "../constants"

export const formatMetricValue = (value, metric) => {
  const format = METRIC_FORMATTERS[metric] || ((d) => d)
  return format(value)
}
