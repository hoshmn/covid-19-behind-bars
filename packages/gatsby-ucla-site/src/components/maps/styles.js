import { makeStyles } from "@material-ui/core"
import { color } from "d3-color"

/**
 * Styles shared between maps
 */
export const shapeStyles = (theme) => ({
  shape: {
    fill: "#F5F5ED",
    stroke: "#DDDDCB",
  },
  shapeLabel: {
    fill: theme.palette.text.secondary,
    fillOpacity: 1,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(10),
  },
  shapeHighlight: {
    strokeOpacity: 1,
    strokeWidth: 2,
    stroke: color("#DDDDCB").darker(0.4).formatHex(),
    fill: "transparent",
  },
})

export const spikeStyles = (theme) => ({
  spike: {
    strokeWidth: 0.8,
    fillOpacity: 1,
  },
  spikeHighlight: {
    stroke: "rgba(255,0,0,0.5)",
    fill: "rgba(255,0,0,0.1)",
    strokeWidth: 1.5,
  },
})

export const useShapeStyles = makeStyles(shapeStyles)
export const useSpikeStyles = makeStyles(spikeStyles)
