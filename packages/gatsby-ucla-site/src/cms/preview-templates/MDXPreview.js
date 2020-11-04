import React from "react"
import PropTypes from "prop-types"
import MDX from "mdx-scoped-runtime"
import mdxComponents from "gatsby-theme-hyperobjekt-core/src/components/mdx"
import Colors from "../../components/colors"
const MDXPreview = ({ entry }) => {
  console.log("mdx", mdxComponents)
  const { Hero, SEO, ...components } = mdxComponents
  return (
    <MDX components={components} scope={{ Hero, SEO, Colors }}>
      {entry.getIn(["data", "body"])}
    </MDX>
  )
}

MDXPreview.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default MDXPreview
