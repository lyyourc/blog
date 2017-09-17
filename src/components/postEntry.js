import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { format } from '@/utils/util'

const Title = styled.h3`
  margin: 0;
  color: ${props => props.theme.color.base};
`

const UpdateDate = styled.div``

const Contributor = styled.div``

const Entry = styled(Link)`
  display: block;
  cursor: pointer;
  text-decoration: none;
  line-height: 1.5;
  padding: ${props => props.theme.gutter};
  border-bottom: 1px solid ${props => props.theme.color.border};
  color: ${props => props.theme.color.baseLight};
`

export default function PostEntry({ post }) {
  return (
    <Entry to={`/post?path=${post.path}`}>
      <Title>{post.title}</Title>
      <UpdateDate>Wrote: {format(post.date)}</UpdateDate>
      <Contributor>{/* By: {post.contributor} */}</Contributor>
    </Entry>
  )
}

PostEntry.propTypes = {
  post: PropTypes.object.isRequired,
}
