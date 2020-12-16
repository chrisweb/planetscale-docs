import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import MDXContent from '../components/Common.MDXContent'

export default function DocsPage({ data }) {
  const { doc } = data

  if (doc) {
    const { frontmatter, body, fields } = doc
    return (
      <Fragment>
        <TitleAndMetaTags
          title={frontmatter.title}
          pathname={`${fields.slug}`}
        />
        <MDXContent body={body}></MDXContent>
      </Fragment>
    )
  }
}

export const pageQuery = graphql`
  query DocQuery($slug: String!) {
    doc: mdx(
      fields: { slug: { eq: $slug } }
      frontmatter: { title: { ne: "" } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
      body
    }
  }
`
