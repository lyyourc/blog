import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import Disqus from '@/components/disqus'
import styledPost from '@/styled/post'
import media from '@/styled/media'

const Article = styled.article`
  padding: 2em 1em;
  line-height: 1.7;
`

const PostHeader = styled.header`
  text-align: center;
`

const PostTitle = styled.h1`
  margin: 0;
  text-transform: capitalize;
  padding-top: 1em;
  font-size: 1.8em;
`

const PostDate = styled.p`
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #aaa;
`

const MarkdownBody = styled.div`
  margin: 4.2em 0;
  font-family: inherit;

  ${styledPost};

  ${media.lessThan('mobile')`
    pre {
      padding: 0.8em;
    }
  `};
`

export default function Post({ post, disqus }) {
  const { title, date } = post.frontmatter

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
      <PostHeader>
        {title && <PostTitle>{title}</PostTitle>}
        {date && <PostDate>{date}</PostDate>}
      </PostHeader>
      <MarkdownBody dangerouslySetInnerHTML={{ __html: post.html }} />
      <Disqus shortname={disqus} />
    </Article>
  )
}
