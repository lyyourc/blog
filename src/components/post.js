import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import 'github-markdown-css'

import '@/styled/highlight.css'
import media from '@/styled/media'
import Avatar from '@/components/avatar'
import Disqus from '@/components/disqus'

const AvatarBox = styled(Flex)`
  &:not(:last-child) {
    margin-right: 1em;
  }
`

const Article = styled.article`padding: 2em 0.5em;`

const MarkdownBody = styled.div.attrs({
  className: 'markdown-body',
})`
  margin-bottom: 2em;
  font-family: inherit;

  pre,
  code {
    font-family: ${props => props.theme.font.mono} !important;
  }

  /* avoid jump 2 anchor is overlapped by fixed top header */
  // ${media.greaterThan('mobile')`
  //   h2,
  //   h3,
  //   h4,
  //   h5 {
  //     &::before {
  //       content: '';
  //       display: block;
  //       padding-top: ${props => props.theme.headerHeight};
  //       margin-top: -${props => props.theme.headerHeight};
  //       visibility: hidden;
  //     }
  //   }
  // `};
`

export default function Post({ post, disqus }) {
  const { title, contributors } = post.frontmatter

  const Contributors =
    contributors &&
    contributors.map((username, i) => (
      <AvatarBox key={i} direction="column">
        <Avatar
          username={username}
          width="3em"
          height="3em"
          circle="true"
          showName="true"
          visitable="true"
        />
      </AvatarBox>
    ))

  return (
    <Article>
      <MarkdownBody>
        {title && <h1>{title}</h1>}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {contributors && (
          <div>
            <hr />
            <h3>Contributors</h3>
            <Flex align="center">{Contributors}</Flex>
          </div>
        )}
      </MarkdownBody>
      <Disqus shortname={disqus} />
    </Article>
  )
}
