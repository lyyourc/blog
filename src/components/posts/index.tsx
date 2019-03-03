import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import { sortPostsBySameYear, Post } from '../../utils/post'
import styled from '@/styles/styled'
import PostEntry from './post-entry'
import { Box } from '@/styles/system'
import { css } from '@emotion/core'

export default function Posts() {
  return (
    <StaticQuery
      query={postsQuery}
      render={data => {
        const posts: Post[] = data.allMdx.edges.map((edge: { node: any }) => {
          return {
            ...edge.node,
            ...edge.node.frontmatter,
          }
        })
        const yearPosts = sortPostsBySameYear(posts)
        const thisYear = new Date().getFullYear()

        return yearPosts.map(yearPost => (
          <Box key={yearPost.year} pl={3}>
            {thisYear !== yearPost.year && (
              <PostYear as="h3" css={css`font-weight: normal;`}>
                📆{yearPost.year}
              </PostYear>
            )}

            {yearPost.posts.map((post, j) => (
              <PostEntry key={j} {...post} path={`/posts${post.fields.slug}`} />
            ))}
          </Box>
        ))
      }}
    />
  )
}

const PostYear = styled(Box)`
  margin: 8px 0;
  font-weight: 500;
`

const postsQuery = graphql`
  {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            draft
          }
        }
      }
    }
  }
`
