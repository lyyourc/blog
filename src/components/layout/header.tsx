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
      padding: 0 25px;
      background: #fafafa;
      
      @media (min-width: 768px) {
        height: 60px;
        line-height: 60px;
      }
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
