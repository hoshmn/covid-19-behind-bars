import React from "react"
import clsx from "clsx"
import { Typography, withStyles } from "@material-ui/core"
import { getLang } from "../../common/utils/i18n"
import { JURISDICTIONS, METRICS } from "../../common/constants"
import Stack from "../stack"
import NumberStat from "../stats/number-stat"

const styles = (theme) => ({
  root: {},
  groupTitle: {},
  metricContainer: {},
  metricTitle: {
    marginTop: "1em",
  },
  jurisdictionContainer: {
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.divider,
    paddingBottom: theme.spacing(2),
  },
  jurisdictionLabel: {
    width: "5em",
    marginBottom: -3,
    marginRight: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  stat: {
    width: "10em",
  },
})

const getKey = (...args) => args.join("_")

const groupHasRates = (group) =>
  METRICS[group].reduce(
    (hasRates, metric) => (hasRates ? true : metric.indexOf("_rate") > -1),
    false
  )

const GroupStats = ({ classes, className, group, groupData, ...props }) => {
  return (
    <div className={clsx(classes.root, className)} {...props}>
      <Typography className={classes.groupTitle} variant="h4">
        {getLang(group)}
      </Typography>
      {METRICS[group]
        .filter((metric) => metric.indexOf("_") === -1)
        .map((metric) => (
          <Stack className={classes.metricContainer} key={metric} spacing={2}>
            <Typography className={classes.metricTitle} variant="h5">
              {getLang(metric)}
            </Typography>
            {JURISDICTIONS.map((jurisdiction) => (
              <Stack
                key={jurisdiction}
                className={classes.jurisdictionContainer}
                horizontal
                align="flex-end"
                spacing={2}
              >
                <Typography
                  className={classes.jurisdictionLabel}
                  variant="body2"
                >
                  {getLang(jurisdiction)}
                </Typography>
                <NumberStat
                  className={classes.stat}
                  value={groupData[getKey(jurisdiction, metric)][0]}
                  label={getLang(metric, "label")}
                ></NumberStat>
                {groupHasRates(group) && (
                  <NumberStat
                    className={classes.stat}
                    value={groupData[getKey(jurisdiction, metric, "rate")][1]}
                    label={getLang(metric, "rate")}
                    format=".1%"
                  ></NumberStat>
                )}
              </Stack>
            ))}
          </Stack>
        ))}
    </div>
  )
}

GroupStats.propTypes = {}

export default withStyles(styles)(GroupStats)
