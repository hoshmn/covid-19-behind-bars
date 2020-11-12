import React from "react"
import shallow from "zustand/shallow"
import PropTypes from "prop-types"
import clsx from "clsx"
import useOptionsStore from "./use-options-store"
import { ButtonGroup, Button, withStyles } from "@material-ui/core"

const styles = (theme) => ({
  root: {},
  button: {},
  active: {
    background: "#D7790F",
    color: "#fff",
  },
})

const MetricToggle = ({ classes, className, ...props }) => {
  const [metric, metrics, setMetric] = useOptionsStore(
    (state) => [state.metric, state.metrics, state.setMetric],
    shallow
  )
  const handleSelect = (value) => {
    setMetric(value)
  }
  return (
    <ButtonGroup
      className={classes.root}
      color="primary"
      aria-label="metric selection"
      {...props}
    >
      {metrics.map((m) => (
        <Button
          className={clsx(classes.button, { [classes.active]: m === metric })}
          key={m}
          value={m}
          onClick={(e) => handleSelect(m, e)}
        >
          {m}
        </Button>
      ))}
    </ButtonGroup>
  )
}

MetricToggle.propTypes = {}

export default withStyles(styles)(MetricToggle)
