import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Posts from '../components/posts'

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="博客" />
      <Posts />
    </Layout>
  )
}
