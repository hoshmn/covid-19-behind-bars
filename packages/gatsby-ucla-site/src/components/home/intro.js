import React from "react"
import PropTypes from "prop-types"
import { Grid, Typography, withStyles } from "@material-ui/core"
import { Block } from "gatsby-theme-hyperobjekt-core"
import {
  subtitleTypography,
  titleTypography,
} from "../../gatsby-theme-hyperobjekt-core/theme"

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(38),
    maxWidth: "16em",
    marginTop: 0,
  },
  subtitle: {
    ...subtitleTypography,
    fontSize: theme.typography.pxToRem(36),
    color: theme.palette.secondary.main,
    marginTop: 0,
  },
  body: {
    maxWidth: "25em",
  },
})

const Intro = ({ classes, className, title, subtitle, body, ...props }) => {
  return (
    <Block className={classes.root} type="fullWidth">
      <Grid container justify="center" spacing={3}>
        <Grid item xs={10}>
          <Typography className={classes.title} variant="h2">
            {title}
          </Typography>
          <Typography className={classes.subtitle} variant="h2">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography className={classes.body} variant="body1">
            {body}
          </Typography>
        </Grid>
      </Grid>
    </Block>
  )
}

Intro.propTypes = {}

export default withStyles(styles)(Intro)
