import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

import { px2vh, px2vw } from '@/styled/helpers'
import avatarIcon from '@/assets/images/avatar.png'

const Footer = styled(Flex)`
  padding: ${px2vh(10)} ${px2vw(20)};
  text-align: center;
  background-color: ${props => props.theme.color.bgDark};
`
const Avatar = styled.img`
  width: 1.6em;
  heigth: 1.6em;
  border-radius: 50%;
`

export default function AppFooter() {
  return (
    <Footer align="center" justify="center">
      <a href="/">
        <Avatar src={avatarIcon} />
      </a>
    </Footer>
  )
}
