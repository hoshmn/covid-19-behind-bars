import React, { useCallback, useEffect, useState } from "react"
import clsx from "clsx"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { AppBar, withStyles } from "@material-ui/core"
import { navigate } from "gatsby"
import { Link } from "gatsby-theme-material-ui"

const styles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
    borderTop: `2px dotted #DDDDCB`,
    // overlay the header border
    top: theme.layout.headerHeight,
    // must override first child margin
    margin: theme.spacing(0, -2),
    marginTop: `0!important`,
    width: `calc(100% + ${theme.spacing(4)})`,
    zIndex: 1,
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(0, -3),
      width: `calc(100% + ${theme.spacing(6)})`,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  tabs: {
    justifyContent: "center",
  },
  scroller: {
    flexGrow: "0",
  },
  tab: {
    textTransform: "none",
    minWidth: 1,
    "& .MuiTab-wrapper": {
      color: theme.palette.text.primary,
    },
  },
})

function SectionNavigation({
  classes,
  className,
  current,
  sections,
  onSelect,
  TabsProps = {},
  ...props
}) {
  // const [current, setCurrent] = useState(defaultCurrent)

  const handleSelect = useCallback(
    (section, e) => {
      if (onSelect) return onSelect(section, e)
      navigate("#" + section)
    },
    [onSelect]
  )

  // useEffect(() => {
  //   setCurrent(defaultCurrent)
  // }, [defaultCurrent, setCurrent])

  return (
    <AppBar
      position="sticky"
      color="default"
      className={clsx(classes.root, className)}
      {...props}
    >
      <Tabs
        classes={{ root: classes.tabs, scroller: classes.scroller }}
        value={current ? current : false}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="page sections"
        {...TabsProps}
      >
        {sections.map((section, i) => {
          return (
            <Tab
              className={classes.tab}
              key={section.id}
              label={section.name}
              value={section.id}
              // onClick={(e) => handleSelect(section.id, e)}
              id={`section-navigation-${i}`}
              component={Link}
              to={"#" + section.id}
            />
          )
        })}
      </Tabs>
    </AppBar>
  )
}

export default withStyles(styles)(SectionNavigation)
