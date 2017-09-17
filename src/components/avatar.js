import React from 'react'
import styled from 'styled-components'

const StyledAvatar = styled.img`
  vertical-align: middle;
  border-radius: ${props => (props.circle ? '50%' : 0)};
  width: ${props => props.width || '20px'};
  height: ${props => props.height || '20px'};
`

const Title = styled.div`
  color: ${props => props.theme.color.baseLight};
  &:hover {
    color: ${props => props.theme.color.primary};
  }
`

const Anchor = styled.a`
  display: block;
  text-decoration: none !important;
  text-align: center;
`

export default function Avatar({ username, showName, visitable, ...rest }) {
  const url = `https://github.com/${username}`
  const jump = visitable ? { href: url, target: '__blank' } : {}

  return (
    <Anchor {...jump}>
      <StyledAvatar src={url + '.png'} {...rest} />
      {showName && <Title>{username}</Title>}
    </Anchor>
  )
}
