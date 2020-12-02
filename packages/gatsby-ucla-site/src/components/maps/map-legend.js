import React from "react"
import clsx from "clsx"
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core"
import shallow from "zustand/shallow"
import { useOptionsStore } from "../../common/hooks"
import { sansSerifyTypography } from "../../gatsby-theme-hyperobjekt-core/theme"

const styles = (theme) => ({
  root: {
    boxShadow: "none",
    background: "transparent",
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  group: {
    flexDirection: "column",
  },
  formControl: {
    marginLeft: 0,
    marginRight: theme.spacing(2),
  },
  label: {
    marginRight: "auto",
  },
})

const LegendLabel = ({ color, checked, children, ...props }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          borderRadius: "100%",
          width: 12,
          height: 12,
          borderColor: color,
          borderWidth: 1,
          borderStyle: "solid",
          background: checked ? color : "transparent",
          display: "block",
          marginRight: 8,
        }}
      ></span>
      <Typography variant="body2" style={{ ...sansSerifyTypography }}>
        {children}
      </Typography>
    </div>
  )
}

const MapLegend = ({ classes, className, ...props }) => {
  const [
    categories,
    selectedCategories,
    setSelectedCategories,
    categoryColors,
  ] = useOptionsStore(
    (state) => [
      state.categories,
      state.selectedCategories,
      state.setSelectedCategories,
      state.categoryColors,
    ],
    shallow
  )
  const isSelected = (category) => selectedCategories.indexOf(category) > -1
  const handleToggleCategory = (category) => {
    const newCategories = isSelected(category)
      ? selectedCategories.filter((c) => c !== category)
      : [category, ...selectedCategories]
    setSelectedCategories(newCategories)
  }
  return (
    <Paper className={clsx("map-legend", classes.root, className)} {...props}>
      <FormControl component="fieldset">
        <FormGroup className={classes.group}>
          {categories.map((c, i) => (
            <FormControlLabel
              key={c}
              value={c}
              control={
                <Checkbox
                  color="primary"
                  checked={isSelected(c)}
                  onClick={(e) => handleToggleCategory(c, e)}
                  style={{ display: "none" }}
                />
              }
              label={
                <LegendLabel checked={isSelected(c)} color={categoryColors[i]}>
                  {c}
                </LegendLabel>
              }
              labelPlacement="start"
              classes={{ root: classes.formControl, label: classes.label }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Paper>
  )
}

MapLegend.propTypes = {}

export default withStyles(styles)(MapLegend)
