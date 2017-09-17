import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import styled from 'styled-components'
import frontMatter from 'front-matter'
import 'github-markdown-css'

import md2react from '@/utils/md2react'
import { px2vw, px2vh } from '@/styled/helpers'
import PageView from '@/styled/pageView'
import Loading from '@/components/loading'

const StyledPost = styled.div.attrs({
  className: 'markdown-body',
})`
  padding: ${px2vh(20)} ${px2vw(28)};
  font-size: inherit !important;
`
const Title = styled.h1``

export default class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = { post: null }
  }
  componentDidMount() {
    const { path } = qs.parse(this.props.location.search)

    import(`../../posts${path}`).then(md => {
      const { attributes, body } = frontMatter(md)
      const post = { ...attributes, body }

      this.setState({ post })
    })
  }
  render() {
    const { post } = this.state

    if (!post) {
      return (
        <PageView>
          <Loading />
        </PageView>
      )
    }

    return (
      <PageView>
        <StyledPost>
          <Title>
            {post.title}
          </Title>
          {md2react(post.body).tree}
        </StyledPost>
      </PageView>
    )
  }
}

Post.propTypes = {
  location: PropTypes.object.isRequired,
}
