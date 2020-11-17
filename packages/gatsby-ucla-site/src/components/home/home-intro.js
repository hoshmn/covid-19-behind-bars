import React, { useCallback, useMemo } from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { Block } from "gatsby-theme-hyperobjekt-core"
import ReactTooltip from "react-tooltip"
import { MapTooltip, MapLegend, MapMetricControl } from "../map"
import HomeMap from "./home-map"

const styles = (theme) => ({
  root: {
    position: "relative",
    display: "flex",
    padding: 0,
    height: `calc(100vh - ${theme.layout.headerHeight}px)`,
    "& .svg-map": {
      maxHeight: `calc(100vh - ${
        theme.layout.headerHeight + theme.spacing(6)
      }px)`,
      margin: "auto",
      width: "100%",
      height: "100%",
    },
  },
  controls: {
    position: "absolute",
    top: theme.spacing(3),
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
})

const HomeIntro = ({ classes, className, ...props }) => {
  return (
    <Block
      type="fullWidth"
      data-tip=""
      className={clsx(classes.root, className)}
      {...props}
    >
      <div className={classes.controls}>
        <MapMetricControl />
        <MapLegend />
      </div>
      <HomeMap />
      {/* <ReactTooltip>
        {hoveredData && (
          <MapTooltip name={hovered.properties.name} data={hoveredData} />
        )}
      </ReactTooltip> */}
    </Block>
  )
}

HomeIntro.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
}

export default withStyles(styles)(HomeIntro)
