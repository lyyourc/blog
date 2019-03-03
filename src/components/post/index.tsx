import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/tag'
import styled from '@/styles/styled'
import SEO from '../../components/seo'
import { Post } from '../../utils/post'
import Layout from '../layout'
import './prismjs.theme.css'
import { Box } from '@/styles/system'
import { css } from '@emotion/core'

export default function PostComponent(props: Post) {
  const { title, date, code } = props

  return (
    <Layout>
      <SEO title={title} />

      <Article as="article" p={3}>
        <Header mb={[4, 5]}>
          <ArticleTitle>{title}</ArticleTitle>
          <ArticleDate>📆{date}</ArticleDate>
        </Header>
        <MDXProvider>
          <MDXRenderer>{code.body}</MDXRenderer>
        </MDXProvider>
      </Article>
    </Layout>
  )
}

const Article = styled(Box)`
  line-height: 1.7;

  a {
    color: ${props => props.theme.pallete.teal[0]};
  }

  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  h4,
  h5 {
    font-size: 16px;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    line-height: 1.25;
  }

  @media (min-width: 768px) {
    h2,
    h3,
    h4,
    h5 {
      margin-bottom: 1em;
    }
    h2 {
      margin-top: 2em;
    }
    h3 {
      margin-top: 1.5em;
    }
    h4 {
      margin-top: 1em;
    }
  }

  blockquote {
    color: #a5a5a5;
    padding-left: 15px;
    border-left: 5px solid #f0f0f0;
    margin: 0;
  }
`

const Header = styled(Box)`
  @media (min-width: 768px) {
    text-align: center;
  }  
`

const ArticleDate = styled.div`
  font-size: 0.8em;
  opacity: 0.7;
`

const ArticleTitle = styled.h1`
  margin: 0;
`
