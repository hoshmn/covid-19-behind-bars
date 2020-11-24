import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Block, Layout } from "gatsby-theme-hyperobjekt-core"
import Intro from "./intro"
import HomeMap from "./map"
import Sponsors from "./sponsors"
import { Grid } from "@material-ui/core"
import Subscribe from "../page/subscribe"
// import Table from "./table"

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
// TODO: pull from front matter
const title = "COVID-19 in American Jails and Prisons:"
const subtitle = "Cumulative Cases, Active Cases, and Deaths"
const body = `The UCLA COVID-19 Behind Bars Data Project tracks the spread and impact of COVID-19 in American carceral facilities and pushes for greater transparency and accountability around the pandemic response of the carceral system.`

const HomeTemplate = ({
  pageContext,
  data: { mdx },
  classes,
  className,
  ...props
}) => {
  return (
    <Layout title={"home"}>
      <Intro title={title} subtitle={subtitle} body={body} />
      <HomeMap />
      {/* <Table /> */}
      <Block type="fullWidth" style={{ background: "#fff" }}>
        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </Grid>
        </Grid>
      </Block>
      <Sponsors />
      <Subscribe />
    </Layout>
  )
}

export default HomeTemplate