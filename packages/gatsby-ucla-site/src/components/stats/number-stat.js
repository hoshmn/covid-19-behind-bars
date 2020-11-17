import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { Typography, withStyles } from "@material-ui/core"
import Stack from "../stack"

export const styles = (theme) => ({
  root: {},
  number: {
    fontSize: theme.typography.pxToRem(40),
    color: theme.palette.secondary.main,
    fontWeight: 700,
    lineHeight: 1,
  },
  label: {
    color: theme.palette.text.secondary,
    lineHeight: 1,
  },
})

const NumberStat = ({ classes, className, value, label, ...props }) => {
  return (
    <Stack className={clsx("number-stat", classes.root, className)} {...props}>
      <Typography className={classes.number} variant="number">
        {value}
      </Typography>
      <Typography className={classes.label} variant="body2">
        {label}
      </Typography>
    </Stack>
  )
}

NumberStat.propTypes = {}

export default withStyles(styles)(NumberStat)
