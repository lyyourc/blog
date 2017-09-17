import React from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { Flex, Box } from 'grid-styled'
import { normalize, animation } from 'polished'

import Logo from '@/assets/avatar.png'
import theme from '@/styled/theme'
import media from '@/styled/media'
import { styledScrollbar, fixedNav } from '@/styled/mixins'
import { rotate360 } from '@/styled/animations'
import Navs from '@/layouts/navs'
import Socials from '@/components/socials'

const Container = styled.div`
  color: ${props => props.theme.color.base};
  font-family: ${props => props.theme.font.sans};
`

const Header = styled(Flex).attrs({
  is: 'header',
  justify: 'space-between',
  align: 'center',
})`
  ${fixedNav};

  padding: 0 3em;

  ${media.lessThan('desktop')`
    padding: 0 1em;
  `};

  ${media.lessThan('mobile')`
    position: static;
  `}；
`

const SiteAvatar = styled.div`
  background: url(${Logo});
  background-size: cover;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin-right: 0.5em;
  ${animation([rotate360, '5s', 'linear', 1])};
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
  margin-top: ${props => props.theme.headerHeight};
  min-height: calc(100vh - ${props => props.theme.headerHeight});

  ${media.lessThan('tablet')`
    padding-bottom: ${props => props.theme.headerHeight};
  `};

  ${media.lessThan('mobile')`
    margin-top: 0;
  `};
`

const Page = styled(Box).attrs({
  flex: 1,
})`
  padding: 1em;
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
        <Main>
          <Page>{children()}</Page>
        </Main>
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
        }
      }
    }
  }
`
