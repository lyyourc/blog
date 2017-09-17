import styled, { css } from 'styled-components'
import { Flex } from 'grid-styled'

export const StyledContainer = styled(Flex)`
  width: 100%;
  height: 100%;
`

export const styledScrollbar = function styledScrollbar(theme) {
  if (theme) {
    return `
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background: ${theme.color.bg};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${theme.color.border};
      }
    `
  }

  return css`
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: ${props => props.theme.color.bg};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.color.border};
    }
  `
}

export const fixedNav = function fixedNav() {
  return css`
    position: fixed;
    top: ${props => (props.position === 'bottom' ? 'auto' : 0)};
    bottom: ${props => (props.position === 'bottom' ? 0 : 'auto')};
    left: 0;
    width: 100%;
    z-index: 1023;

    height: ${props => props.theme.headerHeight};
    border-${props => (props.position === 'bottom' ? 'top' : 'bottom')}:
      1px solid ${props => props.theme.color.border};
    background-color: #fff;
  `
}
