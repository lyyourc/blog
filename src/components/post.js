import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import 'github-markdown-css'

import '@/styled/highlight.css'
import Disqus from '@/components/disqus'

const Article = styled.article`padding: 2em 1em;`

const MarkdownBody = styled.div.attrs({
  className: 'markdown-body',
})`
  margin-bottom: 2em;
  font-family: inherit;

  pre,
  code {
    font-family: ${props => props.theme.font.mono} !important;
  }
`

export default function Post({ post, disqus }) {
  const { title } = post.frontmatter

  return (
    <Article>
      <Helmet>
        <title>{title}</title>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
          onLoad="this.rel='stylesheet'"
        />
      </Helmet>
      <MarkdownBody>
        {title && <h1>{title}</h1>}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </MarkdownBody>
      <Disqus shortname={disqus} />
    </Article>
  )
}
