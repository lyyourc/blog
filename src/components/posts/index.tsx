import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import { sortPostsBySameYear, Post } from '../../utils/post'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const PostEntry = styled.div`
  font-weight: bold;
  padding: 8px;
  margin: 10px 0;
  line-height: 1.2;
  background: linear-gradient(to bottom, #f4f4f4, #f6f6f6);

  &:first-of-type {
    margin-top: 0;
  }

  @media (min-width: 768px) {
    padding: 12px;
  }
`

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
            {thisYear !== yearPost.year && <h3>{yearPost.year}</h3>}

            {yearPost.posts.map((post, j) => (
              <Link
                key={j}
                to={'/posts' + post.fields.slug}
                css={css`
                  color: inherit;
                `}
              >
                <PostEntry>{post.title}</PostEntry>
              </Link>
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
            date(formatString: "MMMM DD, YYYY")
            draft
          }
        }
      }
    }
  }
`
