import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import media from 'styled-media-query'

import Social from '@/components/social'
import { activeNavClassName, NavItem } from '@/styled/navItem'
import hamburgerIcon from '@/assets/images/hamburger.svg'
import closeIcon from '@/assets/images/close.svg'
import { px2vw, px2vh } from '@/styled/helpers'

const hideNotInMobile = media.greaterThan('small')`
  display: none;
`
const BurberIcon = styled.img`
  width: 1.2em;
  height: 1.2em;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${Aside} [data-toggle=true] & {
    opacity: 0;
  }
  ${hideNotInMobile};
`
const Title = styled.h4`
  margin: 0;
  margin-left: 10px;
  ${hideNotInMobile};
`

const Header = styled(Flex)`
  background: ${props => props.theme.color.bgDark};
  padding: ${px2vh(20)} ${px2vw(20)};

  ${media.greaterThan('small')`
    background: transparent;
    padding-left: 10px;
    padding-right: 10px;
  `};
`

const CloseBtn = styled.img`
  width: 1em;
  height: 1em;
  margin-right: 10px;
  margin-left: auto;
  ${hideNotInMobile};
`
const NavsInHeader = styled.div`
  display: none;
  ${media.greaterThan('small')`
    display: block;
  `};
`

const NavList = styled(Flex)`
  background: #fff;
  padding: 10px 0;
  overflow: scroll;

  position: fixed;
  top: 0;
  height: 100%;
  transform: translate(-100%);

  opacity: 0;
  transition: all 0.2s ease-in-out;

  ${Aside} [data-toggle=true] & {
    width: 80%;
    transform: translate(0);
    opacity: 1;
  }
  ${hideNotInMobile};
`

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: none;

  ${Aside} [data-toggle=true] & {
    opacity: 1;
    display: block;
  }
`

const Aside = styled(Flex)``

export default class BurgerNav extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = { isToggleOn: false }
  }

  render() {
    const { location, routes } = this.props
    const matchedRoute = routes.find(r => r.path === location.pathname)

    const navs = this.props.routes.map((item, i) => (
      <NavItem
        onClick={() => this.toggle()}
        exact={true}
        key={i}
        to={item.path}
        activeClassName={activeNavClassName}>
        {item.text}
      </NavItem>
    ))

    return (
      <Aside direction="column" data-toggle={this.state.isToggleOn}>
        <Header align="center">
          <BurberIcon
            src={hamburgerIcon}
            alt="菜单"
            onClick={() => this.toggle()}
          />
          <Title onClick={() => this.toggle()}>
            {matchedRoute ? matchedRoute.text : ''}
          </Title>
          <NavsInHeader>{navs}</NavsInHeader>
          <Social />
        </Header>

        <Overlay onClick={() => this.toggle()} />

        <NavList direction="column">
          <CloseBtn
            src={closeIcon}
            alt="点击关闭按钮"
            onClick={() => this.toggle()}
          />
          {navs}
        </NavList>
      </Aside>
    )
  }

  toggle() {
    this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn }))
  }
}

BurgerNav.propTypes = {
  routes: PropTypes.array.isRequired,
}
