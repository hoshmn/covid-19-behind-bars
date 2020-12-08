import React from "react"
import clsx from "clsx"
import { Button, TextField, Typography, withStyles } from "@material-ui/core"
import { titleTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import Stack from "../Stack"

export const styles = (theme) => ({
  root: {},
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(26),
    color: "#656647",
    maxWidth: "21rem",
    marginBottom: theme.spacing(1),
  },
  textField: {
    width: "100%",
    maxWidth: 236,
  },
  form: {
    minWidth: "21.5rem",
  },
  button: {},
})

const Subscribe = ({ classes, className, ...props }) => {
  return (
    <Stack className={clsx(classes.root, className)} {...props}>
      <Typography className={classes.title} variant="h3">
        Subscribe to our e-mail updates
      </Typography>
      <Stack className={classes.form} align="bottom" spacing={2} horizontal>
        <TextField
          className={classes.textField}
          placeholder="Enter your e-mail address"
        ></TextField>
        <Button className={classes.button}>Subscribe</Button>
      </Stack>
    </Stack>
  )
}

export default withStyles(styles)(Subscribe)
