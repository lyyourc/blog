import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: 3em;
  }

  a {
    color: ${props => props.theme.color.base};
    text-decoration: none;
  }
`

const PostTitle = styled(Flex).attrs({
  is: 'h2',
  justify: 'space-between',
})`
  font-size: 1.5em;
`
const PostExcerpt = styled.p``

const PostDate = styled.small`
  font-weight: normal;
  color: ${props => props.theme.color.baseLight};
  font-size: 0.8em;
`

export default function PostPreview({ slug, title, excerpt, date }) {
  return (
    <Section>
      <Link to={slug}>
        <PostTitle>{title}</PostTitle>
        <PostExcerpt>{excerpt}</PostExcerpt>
      </Link>
      <PostDate>{date}</PostDate>
    </Section>
  )
}
