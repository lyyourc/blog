import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import { px2vw } from '@/styled/helpers'

const socials = [
  { name: 'github', username: 'lyyourc' },
  { name: 'twitter', username: 'lyyourc' },
]
const getIcon = function getIcon(name) {
  return require(`@/assets/images/${name}.svg`)
}
const Anchor = styled.a`
  width: 1.3em;
  height: 1.3em;
  margin-left: ${px2vw(20)};
`
const Icon = styled.img`
  width: 100%;
  height: 100%;
`
const SocialList = styled(Flex)`
  margin-left: auto;  
`

export default function Social() {
  return (
    <SocialList align="center">
      {socials.map((social, i) =>
        <Anchor key={i} href={`https://${social.name}.com/${social.username}`}>
          <Icon src={getIcon(social.name)} alt={social.name} />
        </Anchor>
      )}
    </SocialList>
  )
}
