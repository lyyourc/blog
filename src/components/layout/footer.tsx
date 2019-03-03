import React from 'react'
import { css } from '@emotion/core'
import styled from '../../styles/styled'

export default function AppFooter() {
  return (
    <Footer>✌️</Footer>
  )
}

const Footer = styled('footer')`
  height: 100px;
  line-height: 100px;
  text-align: center;
`