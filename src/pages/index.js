import React from 'react'
import styled from 'styled-components'
import { StyledContainer } from '@/styled/mixins'

const Greeting = styled.h2`color: ${props => props.theme.color.primary};`

export default function Index() {
  return (
    <StyledContainer justify="center" align="center">
      <Greeting>This is my hourse</Greeting>
    </StyledContainer>
  )
}
