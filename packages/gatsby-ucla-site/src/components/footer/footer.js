import React from "react"
import { default as CoreFooter } from "gatsby-theme-hyperobjekt-core/src/components/footer/footer"
import Subscribe from "./subscribe"

const Footer = (props) => {
  return (
    <CoreFooter>
      <Subscribe />
    </CoreFooter>
  )
}

export default Footer
