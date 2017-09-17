import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import media from '@/styled/media'

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
const Title = styled.span`
  display: none;
  ${media.lessThan('desktop')`display: inline-block;`};
`
const SubTitle = styled.span`${media.lessThan('desktop')`display: none`};`

export default function NavItem({ to, title, subTitle, exact, handleClick }) {
  return (
    <StyledLink
      to={to}
      activeClassName={activeClassName}
      exact={exact}
      onClick={handleClick && handleClick}>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </StyledLink>
  )
}

NavItem.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
}
