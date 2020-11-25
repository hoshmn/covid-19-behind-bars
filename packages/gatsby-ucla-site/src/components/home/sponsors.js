import React from "react"
import { Block } from "gatsby-theme-hyperobjekt-core"
import Stack from "../stack"
import { Container, Typography, withStyles } from "@material-ui/core"
import CdcLogo from "../../../content/assets/cdc-logo.svg"
import VitalProjectsFundLogo from "../../../content/assets/vital-projects-fund-logo.svg"
import ArnoldVenturesLogo from "../../../content/assets/arnold-ventures-logo.svg"

export const styles = (theme) => ({
  root: {},
  title: {
    fontSize: theme.typography.pxToRem(23),
    maxWidth: "10em",
    marginTop: 0,
  },
  titleWrapper: {
    [theme.breakpoints.up("md")]: {
      minWidth: "33%",
    },
  },
  logo: {},
})

const Sponsors = ({ classes, ...props }) => {
  return (
    <Block className={classes.root} type="fullWidth" {...props}>
      <Container maxWidth="lg">
        <Stack horizontal justify="space-between" align="center">
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} variant="h3">
              Our generous supporters include:
            </Typography>
          </div>

          <Stack horizontal justify="space-around" style={{ flex: 1 }}>
            <img
              className={classes.logo}
              src={CdcLogo}
              alt="center for disease control logo"
            />
            <img
              className={classes.logo}
              src={VitalProjectsFundLogo}
              alt="Vital Projects Fund logo"
            />
            <img
              className={classes.logo}
              src={ArnoldVenturesLogo}
              alt="Arnold Ventures logo"
            />
          </Stack>
        </Stack>
      </Container>
    </Block>
  )
}

export default withStyles(styles)(Sponsors)
