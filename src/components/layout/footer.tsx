import React from 'react'
import { css } from '@emotion/core'
import styled from '../../styles/styled'

export default function AppFooter() {
  return (
    <Footer>
      <Link href="https://github.com/lyyourc">GitHub</Link>
      😛
      <Link href="https://twitter.com/lyyourc">Twitter</Link>
    </Footer>
  )
}

const Footer = styled('footer')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88px;
  border-top: 1px solid ${props => props.theme.pallete.gray[0]};
  padding: 10px;
  font-size: 1.2em;
`

const Link = styled('a')`
  padding: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`
