import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'

import { pages } from '../../utils/preval'
import NotFound from '@/pages/404'
import Loading from '@/components/loading'

const routes = pages.map(function createRoute(page) {
  const isIndex = page.path === '/index'
  return {
    path: isIndex ? '/' : page.path,
    exact: true,
    component: Loadable({
      loader: () => import(`@/pages${page.path}`),
      loading: Loading,
    }),
    page,
  }
})

const RouteWrapper = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const allProps = { ...props, ...rest }
      return <Component {...allProps} />
    }}
  />
)

const Main = styled.main``

export default function AppMain() {
  return (
    <Main>
      <Switch>
        {routes.map((route, i) => <RouteWrapper key={i} {...route} />)}
        <Route component={NotFound} />
      </Switch>
    </Main>
  )
}

RouteWrapper.propTypes = {
  component: PropTypes.func.isRequired,
}
