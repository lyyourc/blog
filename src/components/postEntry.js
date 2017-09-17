import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

import Avatar from '@/components/avatar'

const Section = styled(Flex)`
  height: 100%;
  background: #fff;
  padding: 1em;
  box-shadow: 1px 1px 2px 2px ${props => props.theme.color.base};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 2px 2px 3px 3px ${props => props.theme.color.base};
  }
`

const Title = styled.h3`
  margin: 0;
  margin-bottom: 1em;
`
const PostExcerpt = styled.p`
  margin: 0;
  color: ${props => props.theme.color.baseLight};
  font-size: 0.9em;
`
const PostMeta = styled(Flex)`line-height: 1.7;`

const Contributors = styled(Flex)`
  > * {
    margin-bottom: 0.2em;

    &:not(:last-child) {
      margin-right: 0.5em;
    }
  }
`

const PostDate = styled.div`
  color: ${props => props.theme.color.baseLight};
  margin-bottom: 0.2em;
  font-size: 0.8em;
`

export default function PostEntry({
  slug,
  title,
  excerpt,
  date,
  contributors,
}) {
  return (
    <Section direction="column" justify="space-between">
      <div>
        <Title>{title}</Title>
        <PostExcerpt>{excerpt}</PostExcerpt>
      </div>
      <PostMeta justify="space-between" align="center" wrap="wrap">
        <Contributors wrap="wrap" align="center">
          {contributors &&
            contributors.map((contributor, i) => (
              <Avatar key={i} username={contributor} />
            ))}
        </Contributors>
        <PostDate>{date}</PostDate>
      </PostMeta>
    </Section>
  )
}
