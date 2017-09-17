import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
`

export default function NotFound() {
  return (
    <Container align="center" justify="center">
      <p>找不到页面 :(</p>
    </Container>
  )
}
