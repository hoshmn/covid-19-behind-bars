import React from "react"
import { Block } from "gatsby-theme-hyperobjekt-core"
import Stack from "../stack"
import { Grid, Typography, withStyles } from "@material-ui/core"

export const styles = (theme) => ({
  root: {},
  title: {
    fontSize: theme.typography.pxToRem(23),
    maxWidth: "10em",
    marginTop: 0,
  },
  logo: {},
})

const Sponsors = ({ classes, ...props }) => {
  return (
    <Block className={classes.root} type="fullWidth" {...props}>
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Stack horizontal justify="space-between" align="center">
            <Typography className={classes.title} variant="h3">
              Our generous supporters include:
            </Typography>
            <Stack horizontal justify="space-around" style={{ flex: 1 }}>
              <img src="https://placehold.it/80x40" />
              <img src="https://placehold.it/120x40" />
              <img src="https://placehold.it/100x40" />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Block>
  )
}

export default withStyles(styles)(Sponsors)
