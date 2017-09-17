import React from 'react'
import styled from 'styled-components'
import { Grid } from 'grid-styled'
import { navigateTo } from 'gatsby-link'

import PostEntry from '@/components/postEntry'

const LearningPage = styled.div`
  min-height: 100%;
  padding: 0.5em;
  background: ${props => props.theme.color.bg};
`

const Card = styled(Grid)`
  padding: 0.5em;
  height: 16em;
  cursor: pointer;

  a {
    color: ${props => props.theme.color.base};
    text-decoration: none;
  }
`

export default function Learning({ data }) {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => {
    const { frontmatter } = node
    const excerpt = frontmatter.excerpt || node.excerpt
    return { ...frontmatter, ...node.fields, excerpt }
  })
  return (
    <LearningPage>
      {posts.map((post, i) => (
        <Card
          key={i}
          width={[1, 1 / 2, 1 / 3, 1 / 4]}
          onClick={() => navigateTo(post.slug)}>
          <PostEntry {...post} />
        </Card>
      ))}
    </LearningPage>
  )
}

export const query = graphql`
  query LearningQuery {
    allMarkdownRemark(filter: { fields: { slug: { regex: "/post/" } } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
