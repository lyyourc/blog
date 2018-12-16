import React from 'react'
import { graphql } from 'gatsby'
import { normalizePost } from '../utils/post'
import Post from '../components/post'

export default function PostTemplate(props) {
  const { mdx } = props.data
  const post = normalizePost(mdx)

  return <Post {...post}></Post>
}

export const pageQuery = graphql`
 query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      tableOfContents
      headings {
        value
        depth
      }
      wordCount {
        words
      }
    }
  }
`
