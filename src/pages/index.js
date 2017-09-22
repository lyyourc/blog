import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import PostPreview from '@/components/postPreview'

const Container = styled.div`
  padding: 1em;
  padding-bottom: 3em;
`

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    const { data } = this.props

    const posts = this.props.data.allMarkdownRemark.edges.map(({ node }) => {
      const { frontmatter } = node
      const excerpt = frontmatter.excerpt || node.excerpt
      return { ...frontmatter, ...node.fields, excerpt }
    })

    const pageSize = 5

    this.state = {
      posts,
      offset: pageSize,
      showMore: posts.length > pageSize,
    }
  }

  render() {
    const { posts, offset } = this.state

    return (
      <Container>
        {posts
          .slice(0, offset)
          .map((post, i) => <PostPreview key={i} {...post} />)}
      </Container>
    )
  }
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fields: { slug: { regex: "/post/" } }
        frontmatter: { draft: { ne: true } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 50)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM DD YYYY")
            excerpt
          }
        }
      }
    }
  }
`
