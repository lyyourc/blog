import React from 'react'
import Post from '@/components/post'

export default function PostTemplate(props) {
  return <Post {...props} />
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
