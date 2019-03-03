import { Link } from 'gatsby'
import React from 'react'
import Avatar from '../avatar'
import styled from '@/styles/styled'
import { Box } from '@/styles/system'

interface HeaderProps {
  title: string
}

export default function AppHeader({ title = '' }: HeaderProps) {
  return (
    <Header pl={2} pt={2} mb={2} as="header">
      <Avatar />

      <H1>
        <Link to="/">{title}</Link>
      </H1>
    </Header>
  )
}

const Header = styled(Box)`
  display: flex;
  align-items: center;
`

const H1 = styled('h1')`
  margin: 0;
  font-size: 1.6em;
`
