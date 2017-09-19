import React, { Component } from 'react'

export default class Disqus extends Component {
  static defaultProps = {
    timeout: 3000,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let disqusLoaded = false
    const { shortname, url, identifier, timeout } = this.props

    if (!shortname) return null

    var disqus_config = function() {
      url && (this.page.url = url)
      identifier && (this.page.identifier = identifier)
    }

    const s = document.createElement('script')
    s.src = `https://${shortname}.disqus.com/embed.js`
    s.setAttribute('data-timestamp', +new Date())
    s.async = true
    s.onload = () => {
      disqusLoaded = true
    }
    s.onerror = () => {
      disqusLoaded = false
    }
    ;(document.head || document.body).appendChild(s)

    setTimeout(() => {
      if (!disqusLoaded) {
        // stop loading discus
        s.parentNode.removeChild(s)
      }
    }, timeout)
  }

  render() {
    return (
      <div>
        <div id="disqus_thread" />
        <noscript>
          <span>
            Please enable JavaScript to view the
            <a href="http://disqus.com/?ref_noscript">
              comments powered by Disqus.
            </a>
          </span>
        </noscript>
      </div>
    )
  }
}
