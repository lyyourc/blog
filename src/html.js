import React, { Component } from 'react'
import PropTypes from 'prop-types'

let stylesStr
if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require('!raw-loader!../public/styles.css')
  } catch (e) {
    console.log(e)
  }
}

class Html extends Component {
  render() {
    let css
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>大前端金融组</title>
          {this.props.headComponents}
          {css}
          <link
            href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
            rel="stylesheet"
          />
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  headComponents: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  postBodyComponents: PropTypes.node.isRequired,
}

module.exports = Html
