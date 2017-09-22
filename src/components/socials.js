import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import GithubIcon from 'react-icons/lib/fa/github'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import RssIcon from 'react-icons/lib/ti/rss'

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
  rss: RssIcon,
}

export default function Socials({ socials }) {
  return (
    <Flex align="center">
      {socials.map((social, i) => {
        const { type, username, href } = social
        const Icon = icons[type]

        return (
          <Anchor key={i} href={href || `//${type}.com/${username}`}>
            {Icon ? <Icon /> : type}
          </Anchor>
        )
      })}
    </Flex>
  )
}
