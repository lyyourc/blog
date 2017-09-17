import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import Draggable from 'react-draggable'

import NavItem from '@/components/navItem'
import media from '@/styled/media'
import { styledScrollbar } from '@/styled/mixins'
import burgerIcon from '@/assets/burger.svg'

const Aside = styled.aside`position: relative;`

const BurgerTrigger = styled.div`
  display: none;
  cursor: pointer;
  background: url(${burgerIcon});
  background-size: cover;
  width: 1.6em;
  height: 1.6em;
  z-index: 1025;

  ${media.lessThan('desktop')`
    display: block;
    position: fixed;
    bottom: 50%;
    right: 1em;
  `};
`
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  opacity: 0;
  z-index: 1023;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  ${media.lessThan('desktop')`
    opacity: ${props => (props.isToggleOn ? 1 : 0)};
    visibility: ${props => (props.isToggleOn ? 'visible' : 'hidden')};
  `};
`

const StyledSidebar = styled.div`
  position: fixed;
  top: ${props => props.theme.headerHeight};
  left: 0;
  height: calc(100% - ${props => props.theme.headerHeight});
  width: ${props => props.theme.sidebarWidth};
  padding: 1em 2em 1em 3em;
  background: #fff;
  z-index: 1024;
  transition: transform 0.3s ease;

  overflow: auto;
  ${styledScrollbar()};

  ${media.lessThan('desktop')`
    top: 0;
    height: 100%;
    transform: translateX(${props => (props.isToggleOn ? 0 : '-100%')});
  `};
`

const Section = styled.section`
  line-height: 1.5;
  &:not(:last-of-type) {
    margin-bottom: 1.5em;
  }
`

const Title = styled.h4`
  margin: 0;
  margin-bottom: 0.3em;
  text-transform: uppercase;
  font-weight: normal;
`

const Links = styled(Flex)`
  font-size: 0.95em;
  color: ${props => props.theme.color.baseLight};
`

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isToggleOn: false }
  }

  render() {
    const { isToggleOn } = this.state
    return (
      <Aside>
        <Draggable bounds="#___gatsby">
          <BurgerTrigger onClick={this.toggle} />
        </Draggable>

        <Overlay isToggleOn={isToggleOn} onClick={this.toggle} />

        <StyledSidebar isToggleOn={isToggleOn}>
          {this.props.links.map((item, i) => (
            <Section key={i}>
              <Title>{item.title}</Title>
              <Links direction="column">
                {Object.keys(item.links).map((key, j) => (
                  <NavItem
                    key={j}
                    title={key}
                    to={item.links[key]}
                    exact={true}
                    handleClick={this.handleSidebarItemClick}
                  />
                ))}
              </Links>
            </Section>
          ))}
        </StyledSidebar>
      </Aside>
    )
  }

  handleSidebarItemClick = e => {
    this.toggle()
  }

  toggle = () => {
    this.setState(prevState => {
      const { isToggleOn } = prevState
      // disable body scroll
      document.body.style.overflow = isToggleOn ? 'visible' : 'hidden'
      return { isToggleOn: !isToggleOn }
    })
  }
}
