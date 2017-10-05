import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import HeadRoom from 'react-headroom'
import Img from 'gatsby-image'

import Socials from '@/components/socials'
import Navs from '@/layouts/navs'

const SiteAvatar = styled(Img)`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin-right: 0.5em;
  background: #fff !important;
`
const SiteTitle = styled.h1`
  font-size: 1.1em;
  font-weight: 500;
  margin: 0;
  margin-right: 1em;
`

const Header = styled(Flex).attrs({
  is: 'header',
  justify: 'space-between',
  align: 'center',
})`
  height: ${props => props.theme.headerHeight};
  max-width: ${props => props.theme.mainContentWidth};
  margin: 0 auto;
  padding: 0 1em;
  background: #fff;
`
export default function AppHeader({ title, navs, socials, avatarImage }) {
  return (
    <HeadRoom>
      <Header>
        <Flex align="center">
          <SiteAvatar
            title="avatar"
            responsiveResolution={avatarImage.responsiveResolution}
          />
          <SiteTitle>{title}</SiteTitle>
          <Navs navs={navs} />
        </Flex>
        <Socials socials={socials} />
      </Header>
    </HeadRoom>
  )
}
