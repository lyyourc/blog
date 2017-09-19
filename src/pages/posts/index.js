import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

import PostEntry from '@/components/postEntry'
import { sortPostsBySameYear } from '@/utils/post'

const PostsIndexPage = styled.div`padding: 1em;`

const PostEntity = styled(Flex).attrs({
  is: 'section',
  direction: 'column',
})`
  &:not(:last-child) {
    margin-bottom: 1em;
  }
`
const PostYear = styled.h3`
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-top: 2em;
`

export default function Learning({ data }) {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => {
    const { frontmatter } = node
    const excerpt = frontmatter.excerpt || node.excerpt
    return { ...frontmatter, ...node.fields, excerpt }
  })
  const thisYear = new Date().getFullYear()

  return (
    <PostsIndexPage>
      {sortPostsBySameYear(posts).map((yearPost, i) => (
        <PostEntity key={i}>
          {thisYear !== yearPost.year && <PostYear>{yearPost.year} 年</PostYear>}
          {yearPost.posts.map((post, j) => (
            <PostEntry key={j} {...post} gutter={(j + 1) % 5 === 0} />
          ))}
        </PostEntity>
      ))}
    </PostsIndexPage>
  )
}

export const query = graphql`
  query LearningQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fields: { slug: { regex: "/post/" } }
        frontmatter: { draft: { ne: true } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM DD YYYY")
          }
        }
      }
    }
  }
`
