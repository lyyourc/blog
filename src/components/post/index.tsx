import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/tag'
import styled from '@emotion/styled'
import SEO from '../../components/seo'
import { Post } from '../../utils/post'
import Layout from '../layout'
import './prismjs.theme.css'

const Article = styled.article`
  line-height: 1.7;

  a {
    color: #70b1e7;
  }

  h1 {
    font-size: 22px;
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

  blockquote {
    color: #a5a5a5;
    padding-left: 15px;
    border-left: 5px solid #f0f0f0;
    margin: 0;
  }
`
const ArticleTitle = styled.h1`
  padding: 15px 0;
  margin: 0;
  border-bottom: 0.5px solid rgb(221, 221, 221);
`

export default function PostComponent(props: Post) {
  const { title, code } = props

  return (
    <Layout>
      <SEO title={title} />

      <Article>
        <ArticleTitle>{title}</ArticleTitle>
        <MDXProvider>
          <MDXRenderer>{code.body}</MDXRenderer>
        </MDXProvider>
      </Article>
    </Layout>
  )
}
