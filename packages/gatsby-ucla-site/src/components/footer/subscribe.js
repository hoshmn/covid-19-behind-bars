import React from "react"
import { Button, TextField, Typography, withStyles } from "@material-ui/core"
import { titleTypography } from "../../gatsby-theme-hyperobjekt-core/theme"
import Stack from "../stack"

export const styles = (theme) => ({
  root: {
    background: "#f5f5ed",
  },
  title: {
    ...titleTypography,
    fontSize: theme.typography.pxToRem(26),
    color: "#656647",
    maxWidth: "20rem",
    marginBottom: theme.spacing(1),
  },
  textField: {
    width: 236,
  },
  button: {},
})

const Subscribe = ({ classes, ...props }) => {
  return (
    <Stack>
      <Typography className={classes.title} variant="h3">
        Subscribe to our e-mail updates
      </Typography>
      <Stack spacing={2} horizontal>
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
