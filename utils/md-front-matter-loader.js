const MarkdownIt = require("markdown-it")
const hljs = require('highlight.js')
const frontMatter = require('front-matter')
const loaderUtils = require("loader-utils")

module.exports = function(source) {
  this.cacheable()
  // const options = loaderUtils.parseQuery(this.query)
  const options = {
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' +
        md.utils.escapeHtml(str) +
        '</code></pre>'
    },
  }

  const markdownIt = new MarkdownIt(options)
  const content = frontMatter(source)

  const output = Object.assign(
    {},
    content,
    { body:  markdownIt.render(content.body),
  })

  return `module.exports = ${JSON.stringify(output)}`
}
