import React from "react"

import { useTheme, Grid, Typography } from "@material-ui/core"

const Color = ({ color, width = 16, height = 16, ...props }) => {
  return <div style={{ background: color, width, height }}></div>
}

const ColorRow = ({ name, color, ...props }) => {
  return (
    <Grid container spacing={2} {...props}>
      <Grid item xs={5}>
        {name}
      </Grid>
      <Grid item xs={5}>
        {color}
      </Grid>
      <Grid item xs={2}>
        <Color color={color} />
      </Grid>
    </Grid>
  )
}

const Colors = () => {
  const theme = useTheme()
  const primary = Object.keys(theme.palette.primary)
  const secondary = Object.keys(theme.palette.primary)
  const text = Object.keys(theme.palette.text)
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Primary
      </Typography>
      {primary.map((key) => (
        <ColorRow key={key} name={key} color={theme.palette.primary[key]} />
      ))}
      <Typography variant="h5" gutterBottom>
        Secondary
      </Typography>
      {secondary.map((key) => (
        <ColorRow key={key} name={key} color={theme.palette.secondary[key]} />
      ))}
      <Typography variant="h5" gutterBottom>
        Text
      </Typography>
      {text.map((key) => (
        <ColorRow key={key} name={key} color={theme.palette.text[key]} />
      ))}
    </div>
  )
}

export default Colors
