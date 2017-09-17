import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import media from 'styled-media-query'

export const activeNavClassName = 'mine-nav-active'

export const NavItem = styled(NavLink)`
  text-decoration: none;
  text-transform: capitalize;
  padding: 12px 20px;
  color: ${props => props.theme.color.base};
  border-bottom: 1px solid ${props => props.theme.color.border};

  &.${activeNavClassName} {
    color: ${props => props.theme.color.active};
  }

  ${media.greaterThan('small')`
    border-bottom: none;
    &:first-child {
      padding-left: 0;
    }
  `};
`
