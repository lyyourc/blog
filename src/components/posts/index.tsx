import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import { sortPostsBySameYear, Post } from '../../utils/post'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import PostEntry from './post-entry'

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
          <div key={yearPost.year}>
            {thisYear !== yearPost.year && <h2>{yearPost.year}</h2>}

            {yearPost.posts.map((post, j) => (
              <PostEntry key={j} {...post} path={`/posts${post.fields.slug}`} />
            ))}
          </div>
        ))
      }}
    />
  )
}

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
