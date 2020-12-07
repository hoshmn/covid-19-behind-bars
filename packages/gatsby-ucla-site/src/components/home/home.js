import React from "react"
import { graphql } from "gatsby"
import { Layout } from "gatsby-theme-hyperobjekt-core"
import Intro from "./intro"
import SpikeMap from "./map"
import Sponsors from "./sponsors"
import Table from "./table"
import CdcLogo from "../../../content/assets/cdc-logo.svg"
import VitalProjectsFundLogo from "../../../content/assets/vital-projects-fund-logo.svg"
import ArnoldVenturesLogo from "../../../content/assets/arnold-ventures-logo.svg"
import MapTooltip from "./map-tooltip"

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
// TODO: pull content from front matter

const content = {
  intro: {
    title: "COVID-19 behind bars data project",
    subtitle: "UCLA Law",
    body: `We are tracking the spread and impact of Covid-19 in American carceral facilities and pushing for greater transparency and accountability around the pandemic response of the carceral system.`,
  },
  map: {
    title: "Showing ${metric} in carceral facilities",
    description:
      "Each spike represents the number of cases in a facility, select a state for more details",
  },
  table: {
    title: "Facilities with the highest ${metric}",
    note: "",
  },
  sponsors: {
    title: "Our generous supporters include:",
    logos: [
      {
        image: CdcLogo,
        link: "",
        alt: "center for disease control logo",
      },
      {
        image: VitalProjectsFundLogo,
        link: "",
        alt: "Vital Projects Fund logo",
      },
      {
        image: ArnoldVenturesLogo,
        link: "",
        alt: "Arnold Ventures logo",
      },
    ],
  },
}

const HomeTemplate = ({
  pageContext,
  data: { mdx },
  classes,
  className,
  ...props
}) => {
  return (
    <Layout title={"home"}>
      <Intro
        title={content.intro.title}
        subtitle={content.intro.subtitle}
        body={content.intro.body}
      />
      <SpikeMap
        title={content.map.title}
        description={content.map.description}
      />
      <MapTooltip />
      <Table title={content.table.title} note={content.table.note} />
      {/* <Block type="fullWidth" style={{ background: "#fff" }}>
        <Container maxWidth="lg">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
      </Block> */}
      <Sponsors title={content.sponsors.title} logos={content.sponsors.logos} />
    </Layout>
  )
}

export default HomeTemplate
