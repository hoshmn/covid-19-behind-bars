import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { Block } from "gatsby-theme-hyperobjekt-core"
import { NationalMap, MapLegend, MapMetricControl } from "../maps"

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

const HomeMap = ({ classes, className, ...props }) => {
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
      <NationalMap />
    </Block>
  )
}

HomeMap.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
}

export default withStyles(styles)(HomeMap)
