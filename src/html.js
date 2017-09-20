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
          <title>lyyourc</title>
          {this.props.headComponents}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={'/favicons/apple-touch-icon.png'}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={'/favicons/favicon-32x32.png'}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={'/favicons/favicon-16x16.png'}
          />
          <link
            rel="mask-icon"
            href={'/favicons/safari-pinned-tab.svg'}
            color="#5bbad5"
          />
          {css}
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
