import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles, withStyles } from "@material-ui/core"

const getAlign = (align) => {
  switch (align) {
    case "right":
      return "flex-end"
    case "center":
      return "center"
    default:
      return "flex-start"
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: ({ horizontal }) => (horizontal ? "row" : "column"),
    alignItems: ({ align }) => getAlign(align),
    "& > * + *": {
      marginTop: ({ spacing, horizontal }) =>
        spacing && !horizontal ? theme.spacing(spacing) : undefined,
      marginLeft: ({ spacing, horizontal }) =>
        spacing && horizontal ? theme.spacing(spacing) : undefined,
    },
  },
}))

export const styles = (theme) => ({
  root: {
    display: "flex",
  },
})

const Stack = ({
  classes,
  className,
  horizontal,
  align,
  dense,
  spacing = 1,
  children,
  ...props
}) => {
  const { root } = useStyles({ spacing, horizontal, align })
  return <div className={clsx("stack", classes.root, root)}>{children}</div>
}

export default withStyles(styles)(Stack)
