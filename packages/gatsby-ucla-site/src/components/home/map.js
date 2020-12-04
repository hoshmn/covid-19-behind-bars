import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { fade, Typography, withStyles } from "@material-ui/core"
import { Block } from "gatsby-theme-hyperobjekt-core"
import { NationalMap, MapLegend } from "../maps"
import { navigate } from "gatsby"
import { useMapStore } from "@hyperobjekt/svg-maps"
import ResponsiveContainer from "../responsive-container"
import Stack from "../stack"
import MetricSelection from "../controls/MetricSelection"
import { serifTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
const styles = (theme) => ({
  root: {
    position: "relative",
    display: "flex",
    padding: theme.spacing(3, 0),
    height: `calc(100vh - ${theme.layout.headerHeight})`,
    "& .svg-map": {
      margin: "auto auto 0 auto",
      width: "100%",
      height: `calc(100% - ${theme.layout.headerHeight} - ${theme.spacing(4)})`,
    },
  },
  mapTitle: {
    display: "inline",
    fontSize: theme.typography.pxToRem(26),
    "& .MuiButtonBase-root": {
      ...serifTypography,
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(26),
      color: theme.palette.secondary.main,
      textTransform: "lowercase",
      border: `2px dotted transparent`,
      borderBottomColor: fade("#555526", 0.333),
      borderRadius: 5,
      position: "relative",
      top: "-0.2rem",
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

const HomeMap = ({ classes, title, description, className, ...props }) => {
  const setSelected = useMapStore((state) => state.setSelected)
  // inject metric selection into the title
  const titleParts = title.split("${metric}")
  const titleArray =
    titleParts.length === 2
      ? [titleParts[0], <MetricSelection />, titleParts[1]]
      : [...titleParts, <MetricSelection />]
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
            {titleArray.map((t, i) => (
              <React.Fragment key={i}>{t}</React.Fragment>
            ))}
          </Typography>
          <Typography className={classes.mapDescription} variant="body2">
            {description}
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
