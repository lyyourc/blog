import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'

import Header from './header'
import AppFooter from './footer'
import styled from '../../styles/styled'
import { Box } from '@/styles/system'

const Layout: React.SFC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Container>
        <Header title={data.site.siteMetadata.title} />
        <div css={css`flex: 1;`}>
          {children}
        </div>
        <AppFooter />
      </Container>
    )}
  />
)

export default Layout

const Container = styled(Box)`
  margin: 0 auto;
  max-width: 960px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
