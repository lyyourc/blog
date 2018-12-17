import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'

import Header from './header'
import './index.css'

const Layout = ({ children }: { children: React.ReactNode }) => (
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
      <div className="container">
        <Header title={data.site.siteMetadata.title} />

        <div
          css={css`
            padding: 25px;
            flex: 1;
            box-shadow: 0 1px 6px #e5e5e5;
            -webkit-overflow-scrolling: 'touch';
            
            @media (min-width: 768px) {
              padding: 50px;
            }
          `}
        >
          {children}
        </div>
      </div>
    )}
  />
)

export default Layout
