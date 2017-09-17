import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import GithubIcon from 'react-icons/lib/go/mark-github'
import TwitterIcon from 'react-icons/lib/fa/twitter'

const Anchor = styled.a`
  color: ${props => props.theme.color.base};
  margin-left: 1em;

  svg {
    display: block;
  }
`

const icons = {
  github: GithubIcon,
  twitter: TwitterIcon,
}

export default function Socials({ socials }) {
  return (
    <Flex align="center">
      {socials.map((social, i) => {
        const { type, username } = social
        const Icon = icons[type]

        if (!Icon) return null

        return (
          <Anchor key={i} href={`//${type}.com/${username}`}>
            <Icon />
          </Anchor>
        )
      })}
    </Flex>
  )
}
