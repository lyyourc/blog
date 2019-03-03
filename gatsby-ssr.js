/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { globalStyles } from './src/styles/global'
import { createTheme } from './src/styles/theme'
require('prismjs/themes/prism.css')

export const wrapRootElement = ({ element }) => {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <>
        <Global styles={globalStyles} />
        {element}
      </>
    </ThemeProvider>
  )
}