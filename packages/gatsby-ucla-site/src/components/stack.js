import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { makeStyles, withStyles } from "@material-ui/core"

/**
 * Getter to retrieve align-items and justify-content values.
 * Allows users to specify top / right / bottom / left in
 * addition to any valid flexbox style value (e.g. space-around)
 */
const getAlign = (align) => {
  if (!align) return undefined
  switch (align) {
    case "right":
    case "bottom":
      return "flex-end"
    case "left":
    case "top":
      return "flex-start"
    default:
      return align
  }
}

/** Stack styles */
const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: ({ horizontal }) => (horizontal ? "row" : "column"),
    alignItems: ({ align }) => getAlign(align),
    justifyContent: ({ justify }) => getAlign(justify),
    "& > * + *": {
      marginTop: ({ spacing, horizontal }) =>
        spacing && !horizontal ? theme.spacing(spacing) : undefined,
      marginLeft: ({ spacing, horizontal }) =>
        spacing && horizontal ? theme.spacing(spacing) : undefined,
    },
  },
}))

/** Default root class styles */
export const styles = (theme) => ({
  root: {
    display: "flex",
  },
})

/**
 * A flexbox helper for stacking items horizontally and vertically with even margins
 */
const Stack = ({
  classes,
  className,
  horizontal,
  align,
  justify,
  dense,
  spacing = 1,
  component: Component = "div",
  ...props
}) => {
  const { root } = useStyles({ spacing, horizontal, align, justify })
  return <Component className={clsx("stack", classes.root, root)} {...props} />
}

Stack.propTypes = {
  /** object of classnames that apply to the component ({root}) */
  classes: PropTypes.object,
  /** class name to apply to the root */
  className: PropTypes.string,
  /** spacing increment based on the theme spacing function */
  spacing: PropTypes.number,
  /** true to stack horizontally instead of vertically */
  horizontal: PropTypes.bool,
  /** flexbox align-items property value */
  align: PropTypes.string,
  /** flexbox justify-content property value */
  justify: PropTypes.string,
}
export default withStyles(styles, { name: "HypStack" })(Stack)
