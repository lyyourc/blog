import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

const Greeting = styled.h2`color: ${props => props.theme.color.primary};`

export default function Index() {
  return (
    <Flex align="center" justify="center">
      <Greeting>This is my hourse</Greeting>
    </Flex>
  )
}
