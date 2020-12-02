import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { Typography, withStyles } from "@material-ui/core"
import { Block } from "gatsby-theme-hyperobjekt-core"
import { NationalMap, MapLegend, MapMetricControl } from "../maps"
import { navigate } from "gatsby"
import { useMapStore } from "@hyperobjekt/svg-maps"
import { getLang } from "../../common/utils/i18n"
import ResponsiveContainer from "../responsive-container"
import Stack from "../stack"
const styles = (theme) => ({
  root: {
    position: "relative",
    display: "flex",
    padding: theme.spacing(3, 0),
    height: `calc(100vh - ${theme.layout.headerHeight}px)`,
    "& .svg-map": {
      margin: "auto auto 0 auto",
      width: "100%",
      height: `calc(100% - ${theme.layout.headerHeight + theme.spacing(4)}px)`,
    },
  },
  mapTitle: {
    fontSize: theme.typography.pxToRem(21),
    "& span": {
      color: theme.palette.secondary.main,
      borderBottom: `3px dotted #555526`,
    },
  },
  mapDescription: {
    color: "#555526",
  },
  controls: {
    position: "absolute",
    top: theme.spacing(8),
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
})

const HomeMap = ({ classes, className, ...props }) => {
  const setSelected = useMapStore((state) => state.setSelected)
  // handler for selection
  const handleSelect = (geo) => {
    setSelected(geo)
    navigate(`states/${geo.properties.name.toLowerCase()}`)
  }
  return (
    <Block
      type="fullWidth"
      data-tip=""
      className={clsx(classes.root, className)}
      {...props}
    >
      <ResponsiveContainer className={classes.controls}>
        <Stack>
          <Typography className={classes.mapTitle} variant="h3">
            Showing <span>cases</span> in American carceral facilities
          </Typography>
          <Typography className={classes.mapDescription} variant="body2">
            Each spike represents the number of cases in a facility, select a
            state for more details
          </Typography>
        </Stack>
        <MapLegend />
      </ResponsiveContainer>

      <NationalMap onSelect={handleSelect} />
    </Block>
  )
}

HomeMap.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
}

export default withStyles(styles)(HomeMap)
