import React, { Component } from 'react'
import PropTypes from 'prop-types'

let disqusLoaded = false

export default class Disqus extends Component {
  static propTypes = {
    shortname: PropTypes.string.isRequired,
    identifier: PropTypes.string,
    url: PropTypes.string,
    timeout: PropTypes.number,
  }

  static defaultProps = {
    timeout: 3000,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadDiscus()
  }

  componentDidUpdate() {
    this.loadDisqus()
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

  loadDiscus = () => {
    !disqusLoaded ? this.addDiscusScript() : this.resetDisqus()
  }

  resetDisqus = () => {
    const { identifier, url } = this.props

    if (typeof DISQUS !== void 0) {
      // eslint-disable-next-line no-undef
      DISQUS.reset({
        reload: true,
        config: function config() {
          identifier && (this.page.identifier = identifier)
          // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
          url && (this.page.url = url.replace(/#/, '') + '#!newthread')
        },
      })
    }
  }

  addDiscusScript = () => {
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
        disqusLoaded = false
        s.parentNode.removeChild(s)
      }
    }, timeout)
  }
}
