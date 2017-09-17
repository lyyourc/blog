import React, { createElement } from 'react'
import marksy from 'marksy'
import { hljs } from '@/utils/hightlight.trim'
import 'highlight.js/styles/github.css'

/* eslint-disable react/prop-types */
export default marksy({
  createElement,
  highlight(language, code) {
    return hljs.highlight(language, code).value
  },
  elements: {
    h1({ id, children }) {
      return (
        <h1 className="my-custom-class">
          {children}
        </h1>
      )
    },
  },
})
/* eslint-enable react/prop-types */
