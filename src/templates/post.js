import React from 'react'
import Post from '@/components/post'

export default function PostTemplate({ data }) {
  const { disqus } = data.site.siteMetadata
  const post = data.markdownRemark

  return <Post post={post} disqus={disqus} />
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        disqus
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
