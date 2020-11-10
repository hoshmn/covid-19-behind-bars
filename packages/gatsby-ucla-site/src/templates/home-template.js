import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "gatsby-theme-hyperobjekt-core/src/components/layout"
import React from "react"
import HomeMap from "../components/maps/home-map"
import { navigate } from "gatsby"

export const query = graphql`
  query($pathSlug: String!) {
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      frontmatter {
        path
      }
      body
    }
  }
`

const HomeTemplate = ({ pageContext, data: { mdx } }) => {
  const handleSelect = (geo) => {
    navigate(`states/${geo.properties.name.toLowerCase()}`)
  }
  return (
    <Layout title={"home"}>
      <HomeMap interactive showLabels onSelect={handleSelect} />
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  )
}

HomeTemplate.propTypes = {}

export default HomeTemplate
