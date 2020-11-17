import { withStyles } from "@material-ui/core"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout } from "gatsby-theme-hyperobjekt-core"
import React from "react"
import HomeIntro, { HomeTable } from "../components/home"

const styles = (theme) => ({
  map: {},
})

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

const HomeTemplate = ({
  pageContext,
  data: { mdx },
  classes,
  className,
  ...props
}) => {
  return (
    <Layout title={"home"}>
      <HomeIntro />
      <HomeTable />
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  )
}

HomeTemplate.propTypes = {}

export default withStyles(styles)(HomeTemplate)
