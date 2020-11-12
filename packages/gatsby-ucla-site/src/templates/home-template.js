import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout } from "gatsby-theme-hyperobjekt-core"
import React from "react"
import HomeMap from "../components/home/home-map"

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
  return (
    <Layout title={"home"}>
      <HomeMap />
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  )
}

HomeTemplate.propTypes = {}

export default HomeTemplate
