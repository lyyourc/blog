import { Link } from 'gatsby'
import React from 'react'
import Avatar from '../avatar'
import { css } from '@emotion/core'

interface HeaderProps {
  title: string
}

const Header = ({ title = '' }: HeaderProps) => (
  <div
    css={css`
      height: 44px;
      line-height: 44px;
      border-bottom: 0.5px solid #e5e5e5;
      padding: 0 25px;
      background: #fafafa;
    `}
  >
    <header
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <Avatar />

      <h1 css={{ margin: 0, fontSize: '1.1rem' }}>
        <Link to="/" css={{ color: '#41464b' }}>
          {title}
        </Link>
      </h1>
    </header>
  </div>
)

export default Header
