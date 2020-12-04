import React from "react"
import clsx from "clsx"
import {
  FormControlLabel,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core"
import shallow from "zustand/shallow"
import {
  useActiveMetric,
  useMappableFacilities,
  useOptionsStore,
} from "../../common/hooks"
import { getLang } from "../../common/utils/i18n"
import Stack from "../stack"
import SpikeMarker from "../markers/spike-marker"
import Checkbox from "../controls/Checkbox"
import { extent } from "d3-array"
import { getDataMetricSelector } from "../../common/utils"
import { formatMetricValue } from "../../common/utils/formatters"

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  toggleContainer: {
    marginBottom: "-0.25rem",
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  group: {
    flexDirection: "column",
  },
  formControl: {
    marginLeft: 0,
    marginRight: 0,
  },
  label: {
    whiteSpace: "nowrap",
  },
  checkbox: {
    padding: theme.spacing(0.75, 1),
  },
})

const LabelStack = (props) => (
  <Stack horizontal spacing={1} align="center" {...props} />
)

const JurisdictionToggles = ({ classes, ...props }) => {
  const [
    categories,
    selectedCategories,
    setSelectedCategories,
    categoryColors,
    categoryGradients,
  ] = useOptionsStore(
    (state) => [
      state.categories,
      state.selectedCategories,
      state.setSelectedCategories,
      state.categoryColors,
      state.categoryGradients,
    ],
    shallow
  )
  const isSelected = (category) => selectedCategories.indexOf(category) > -1
  const handleToggleCategory = (category) => {
    const newCategories = isSelected(category)
      ? selectedCategories.filter((c) => c !== category)
      : [category, ...selectedCategories]
    setSelectedCategories(newCategories)
  }
  return (
    <Stack className={classes.root} spacing={0} {...props}>
      {categories.map((c, i) => (
        <FormControlLabel
          key={c}
          value={c}
          control={
            <Checkbox
              className={classes.checkbox}
              checked={isSelected(c)}
              onClick={(e) => handleToggleCategory(c, e)}
            />
          }
          label={
            <Typography variant="body2" component={LabelStack}>
              <SpikeMarker
                width={7}
                height={10}
                fill={categoryGradients[i]}
                stroke={categoryColors[i]}
              />{" "}
              <span>{getLang(c)}</span>
            </Typography>
          }
          labelPlacement="end"
          classes={{ root: classes.formControl, label: classes.label }}
        />
      ))}
    </Stack>
  )
}

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
          formControl: classes.formControl,
          label: classes.label,
          checkbox: classes.checkbox,
        }}
      />
      <SpikeLegend />
    </Stack>
  )
}

MapLegend.propTypes = {}

export default withStyles(styles)(MapLegend)
