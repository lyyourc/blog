import React from 'react'
import propTypes from 'prop-types'

import AppNavs from '@/components/layout/appNavs'
import PostEntry from '@/components/postEntry'
import PageView from '@/styled/pageView'

export default function Guideline({ page }) {
  const { posts } = page

  return (
    <PageView direction="column">
      <AppNavs />
      {posts.map((post, i) => <PostEntry key={i} post={post} />)}
    </PageView>
  )
}

Guideline.propTypes = {
  page: propTypes.object.isRequired,
}
