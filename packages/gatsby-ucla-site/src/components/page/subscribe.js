import React from "react"
import PropTypes from "prop-types"
import { Grid, Typography, withStyles } from "@material-ui/core"
import { Block } from "gatsby-theme-hyperobjekt-core"
import { titleTypography } from "../../gatsby-theme-hyperobjekt-core/theme"

export const styles = (theme) => ({
  root: {
    background: "#f5f5ed",
    marginBottom: -56,
  },
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(26),
    color: "#656647",
    maxWidth: "20rem",
    marginBottom: theme.spacing(8),
  },
})

const Subscribe = ({ classes, ...props }) => {
  return (
    <Block className={classes.root} type="fullWidth">
      <Grid container justify="center">
        <Grid item xs="12" md="10">
          <Typography className={classes.title} variant="h3">
            Subscribe to our e-mail updates
          </Typography>
        </Grid>
      </Grid>
    </Block>
  )
}

export default withStyles(styles)(Subscribe)
