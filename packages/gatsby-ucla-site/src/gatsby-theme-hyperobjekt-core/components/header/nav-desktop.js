import { withStyles } from "@material-ui/core"
import Navigation from "gatsby-theme-hyperobjekt-core/src/components/header/nav"

/** number of cols for the subnav */
const cols = 6

const styles = (theme) => ({
  root: {},
  list: {
    display: "flex",
  },
  listItem: {
    "&:hover $subMenu, &:focus-within $subMenu": {
      pointerEvents: "all",
      transform: "translate3d(0, 0, 0)",
      opacity: 1,
    },
    "&:first-child::before": {
      content: "''",
      display: "block",
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 1,
      height: theme.spacing(3),
      margin: "auto",
      background: "#ccc",
    },
  },
  link: {
    fontFamily: "plantin, sans-serif",
    fontSize: theme.typography.pxToRem(13),
  },
  subMenu: {
    position: "fixed",
    top: theme.layout.headerHeight,
    left: 0,
    width: "100%",
    marginLeft: 0,
    transform: `translate3d(0, -10%, 0)`,
    pointerEvents: "none",
    background: theme.palette.background.paper,
    borderTop: `2px dotted #eee`,
    transition: `transform 400ms ${theme.transitions.easing.easeInOut}, opacity 400ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    display: "block",
    height: 248,
    columnCount: cols,
    padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    boxShadow: theme.shadows[1],
    "& .nav__sub-list-item": {
      display: "inline-block",
      width: `calc(20vw - (${theme.spacing(12)}px / ${cols}))`,
      height: "auto",
    },
    "& .nav__sub-link": {
      padding: 0,
      fontFamily: "plantin, sans-serif",
      fontSize: theme.typography.pxToRem(13),
    },
  },
  subMenuList: {},
  subMenuLink: {},
})

export default withStyles(styles)(Navigation)
