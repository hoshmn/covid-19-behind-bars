import React from "react"
import { Container, useMediaQuery, useTheme } from "@material-ui/core"

const ResponsiveContainer = (props) => {
  const theme = useTheme()
  const bumpWidth = theme.breakpoints.values["lg"] + 80
  const isLarge = useMediaQuery(`(min-width:${bumpWidth}px)`)
  const maxWidth = isLarge ? "lg" : "md"
  return <Container maxWidth={maxWidth} {...props} />
}

export default ResponsiveContainer
