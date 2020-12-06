import React from "react"
import clsx from "clsx"
import { makeStyles, Typography, withStyles } from "@material-ui/core"
import shallow from "zustand/shallow"
import {
  useActiveMetric,
  useMappableFacilities,
  useOptionsStore,
} from "../../common/hooks"
import Stack from "../stack"
import SpikeMarker from "../markers/spike-marker"
import { extent } from "d3-array"
import { getDataMetricSelector } from "../../common/utils"
import { formatMetricValue } from "../../common/utils/formatters"
import JurisdictionToggles from "../controls/JurisdictionToggles"

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  toggleContainer: {
    marginBottom: "-0.25rem",
  },
})

const useSpikeLegendStyles = makeStyles((theme) => ({
  label: {
    fontSize: theme.typography.pxToRem(12),
  },
}))

const SpikeLegend = ({ sizeRange = [1, 60] }) => {
  const classes = useSpikeLegendStyles()
  const [categoryColors, categoryGradients] = useOptionsStore(
    (state) => [state.categoryColors, state.categoryGradients],
    shallow
  )
  const data = useMappableFacilities()
  const metric = useActiveMetric()
  const accessor = getDataMetricSelector(metric)
  const dataExtent = extent(data, accessor)
  const isRate = metric.indexOf("_rate") > -1
  const formatId = isRate ? "rate_legend" : "count_legend"
  const spikeLabels = [isRate ? 0 : 1, dataExtent[1] / 2, dataExtent[1]].map(
    (d) => {
      const value = formatMetricValue(d, formatId)
      const parts = value.split(".")
      // if integer with .0 ending, return only the integer part
      return parts.length > 1 && !isRate
        ? parts[1].indexOf("k") > -1
          ? value
          : parts[0]
        : value
    }
  )
  return (
    <Stack horizontal spacing={1} align="bottom">
      <Stack align="center" spacing={0.5}>
        <SpikeMarker
          height={sizeRange[0]}
          width={7}
          stroke={categoryColors[3]}
          fill={categoryGradients[3]}
        />
        <Typography className={classes.label} variant="body2">
          {spikeLabels[0]}
        </Typography>
      </Stack>
      <Stack align="center" spacing={0.5}>
        <SpikeMarker
          height={sizeRange[1] / 2}
          width={7}
          stroke={categoryColors[3]}
          fill={categoryGradients[3]}
        />
        <Typography className={classes.label} variant="body2">
          {spikeLabels[1]}
        </Typography>
      </Stack>
      <Stack align="center" spacing={0.5}>
        <SpikeMarker
          height={sizeRange[1]}
          width={7}
          stroke={categoryColors[3]}
          fill={categoryGradients[3]}
        />
        <Typography className={classes.label} variant="body2">
          {spikeLabels[2]}
        </Typography>
      </Stack>
    </Stack>
  )
}

const MapLegend = ({ classes, className, ...props }) => {
  return (
    <Stack
      horizontal
      className={clsx("map-legend", classes.root, className)}
      align="bottom"
      spacing={2}
      {...props}
    >
      <JurisdictionToggles
        classes={{
          root: classes.toggleContainer,
        }}
      />
      <SpikeLegend />
    </Stack>
  )
}

MapLegend.propTypes = {}

export default withStyles(styles)(MapLegend)
