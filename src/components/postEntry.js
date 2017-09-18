import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Link from 'gatsby-link'

const Section = styled(({ gutter, ...rest }) => <Flex {...rest} />).attrs({
  align: 'center',
})`
  &:not(:last-child) {
    margin-bottom: ${props => (props.gutter ? '1.6em' : '0.5em')};
  }
`

const PostDate = styled(Box).attrs({
  flex: 1,
})`
  text-align: center;
  letter-spacing: .5px;
  margin-right: .4em;
`
const PostDay = styled.span`
  text-align: right;
  font-size: 1.4em;
  font-weight: 900;
  margin-right: 0.2em;
`

const PostTitle = styled(Box).attrs({
  is: 'h4',
  flex: 5,
})`
  min-width: 0;
  margin: 0;
  padding: .4em;
  background: ${props => props.theme.color.bgDark};
  text-transform: capitalize;

  & a {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`

export default function PostEntry({ slug, title, date, gutter }) {
  const [month, day] = date.split(' ')
  return (
    <Section gutter={gutter}>
      <PostDate>
        <PostDay>{day}</PostDay>
        <small>{month}</small>
      </PostDate>
      <PostTitle>
        <Link to={slug}>{title}</Link>
      </PostTitle>
    </Section>
  )
}
