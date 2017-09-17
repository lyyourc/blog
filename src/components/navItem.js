import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const activeClassName = 'active'

const StyledLink = styled(Link)`
  padding: 0 1em;
  text-decoration: none;
  text-transform: capitalize;
  color: inherit;

  &.${activeClassName} {
    color: ${props => props.theme.color.primary};
  }

  &:last-of-type {
    padding-right: 0;
  }
`

export default function NavItem({ to, title, exact, handleClick }) {
  return (
    <StyledLink
      to={to}
      activeClassName={activeClassName}
      exact={exact}
      onClick={handleClick && handleClick}>
      {title}
    </StyledLink>
  )
}

NavItem.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
}
