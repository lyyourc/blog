import React from 'react'
import { withRouter } from 'react-router'

import BurgerNav from '@/components/burgerNav'

const navs = [
  { path: '/', text: '注意了!不要忘记放到收藏夹(^D)' },
  { path: '/blog', text: '写博客的时候不要发出啪啪啪的键盘声' },
  { path: '/learn', text: ' 所谓学习就是智商不够用' },
]

function AppNavs(props) {
  return <BurgerNav routes={navs} {...props} />
}

export default withRouter(AppNavs)
