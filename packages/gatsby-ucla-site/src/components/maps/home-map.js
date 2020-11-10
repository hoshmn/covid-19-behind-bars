import { withStyles } from "@material-ui/core"
import { StateMap } from "@hyperobjekt/svg-maps"

const styles = {
  shape: {
    fill: "#F5F5ED",
    stroke: "#DDDDCB",
  },
  text: {
    fill: "#67675B",
  },
  hover: {
    strokeWidth: 2,
    stroke: "#67675B",
  },
}

export default withStyles(styles)(StateMap)
