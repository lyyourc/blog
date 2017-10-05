import React from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { Flex } from 'grid-styled'
import { normalize } from 'polished'

import theme from '@/styled/theme'
import { styledScrollbar } from '@/styled/mixins'
import Header from '@/layouts/header'

const Container = styled(Flex).attrs({
  direction: 'column',
})`
  color: ${props => props.theme.color.base};
  font-family: ${props => props.theme.font.sans};

  max-width: ${props => props.theme.mainContentWidth};
  margin: 0 auto;
  min-height: 100vh;
`

const Main = styled(Flex).attrs({
  is: 'main',
  align: 'stretch',
})`
  flex: 1;

  > * {
    flex: 1;
    min-width: 0;
  }
`

injectGlobal`${normalize()}`
injectGlobal`
  html {
    box-sizing: border-box;

    *:not(img) {
      box-sizing: inherit;
    }
  }

  body {
    overflow: auto;
    ${styledScrollbar(theme)};
  }
`

export default function Layout({ children, location, data }) {
  const { navs, title, socials } = data.site.siteMetadata
  const { avatarImage } = data

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header
          title={title}
          navs={navs}
          socials={socials}
          avatarImage={avatarImage}
        />
        <Main>{children()}</Main>
      </Container>
    </ThemeProvider>
  )
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        navs {
          title
          subTitle
          to
          exact
        }
        socials {
          type
          username
          href
        }
      }
    }
    avatarImage: imageSharp(id: { regex: "/avatar/" }) {
      responsiveResolution(width: 32) {
        base64
        aspectRatio
        width
        height
        src
        srcSet
      }
    }
  }
`
