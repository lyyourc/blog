import {
  space,
  color,
  fontSize,
  width,
  fontWeight,
  lineHeight,
} from 'styled-system'
import styled from './styled'

export const Box = styled('div')`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`

export const Text = styled('div')`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
`
