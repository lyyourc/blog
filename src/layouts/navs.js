import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

import NavItem from '@/components/navItem'

const Nav = styled(Flex).attrs({
  is: 'nav',
  justify: 'space-around',
  align: 'center',
})`
`

export default function AppNavs({ navs }) {
  return <Nav>{navs.map((nav, i) => <NavItem key={i} {...nav} />)}</Nav>
}
