import { Link } from 'gatsby'
import React from 'react'
import Avatar from '../avatar'
import { css } from '@emotion/core'
import styled from '@/styles/styled'

interface HeaderProps {
  title: string
}

export default function AppHeader({ title = '' }: HeaderProps) {
  return (
    <Header css={css``}>
      <Avatar />

      <h1 css={{ margin: 0, fontSize: '1.1rem' }}>
        <Link to="/" css={{ color: '#41464b' }}>
          {title}
        </Link>
      </h1>
    </Header>
  )
}

const Header = styled('header')`
  height: 44px;
  line-height: 44px;
  display: flex;
  align-items: center;
`
