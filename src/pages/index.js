import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

import AppNavs from '@/components/layout/appNavs'
import AppFooter from '@/components/layout/appFooter'
import PageView from '@/styled/pageView'

const Content = styled(Flex)`flex: 1;`
const Text = styled.h2`
  color: ${props => props.theme.color.active};
  text-transform: capitalize;
`

export default function Home({ page }) {
  return (
    <PageView direction="column">
      <AppNavs />
      <Content justify="center" align="center">
        <Text> This is my house. </Text>
      </Content>
      <AppFooter />
    </PageView>
  )
}

Home.propTypes = {
  page: PropTypes.object.isRequired,
}
