import React from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { Flex } from 'grid-styled'
import { normalize } from 'polished'
import Link from 'gatsby-link'

import theme from '@/styled/theme'
import { styledScrollbar } from '@/styled/mixins'
import Navs from '@/layouts/navs'
import Socials from '@/components/socials'

const Container = styled(Flex).attrs({
  direction: 'column',
})`
  color: ${props => props.theme.color.base};
  font-family: ${props => props.theme.font.sans};

  max-width: 980px;
  margin: 0 auto;
  min-height: 100vh;
`

const Header = styled(Flex).attrs({
  is: 'header',
  justify: 'space-between',
  align: 'center',
})`
  height: ${props => props.theme.headerHeight};
  padding: 0 1em;
`

const SiteAvatar = styled.div`
  background: url(/avatar.png);
  background-size: cover;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin-right: 0.5em;
`
const SiteTitle = styled.h1`
  font-size: 1.1em;
  font-weight: 500;
  margin: 0;
  margin-right: 1em;
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

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <Flex align="center">
            <SiteAvatar />
            <SiteTitle>{title}</SiteTitle>
            <Navs navs={navs} />
          </Flex>
          <Socials socials={socials} />
        </Header>
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
  }
`
