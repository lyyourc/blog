import React from 'react'
import App from '../App'
import renderer from 'react-test-renderer'

test('App should render well', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
