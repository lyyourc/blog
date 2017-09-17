import React from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { normalize } from 'polished'
import media from 'styled-media-query'

import theme from '@/styled/theme'
import AppMain from '@/components/layout/appMain'

injectGlobal`${normalize()}`
injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    font-size: 100%;
    line-height: calc(1.1em + 0.5vw);
    ${media.lessThan('small')`
      font-size: 14px;
    `}
  }
`

const Container = styled.div`
  color: ${props => props.theme.color.base};
  font-family: ${props => props.theme.font.familySans};
`

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppMain />
      </Container>
    </ThemeProvider>
  )
}
