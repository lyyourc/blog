const MarkdownIt = require("markdown-it")
const hljs = require('highlight.js')
const markdownItAnchor = require('markdown-it-anchor')
const frontMatter = require('front-matter')
const loaderUtils = require("loader-utils")

module.exports = function(source) {
  this.cacheable()

  const options = Object.assign(
    loaderUtils.parseQuery(this.query),
    {
      highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>'
          } catch (__) {}
        }

        return '<pre class="hljs"><code>' +
          (new MarkdownIt()).utils.escapeHtml(str) +
          '</code></pre>'
      }
    }
  )

    const markdownIt = new MarkdownIt(options)
      .use(markdownItAnchor, {
        level: 2,
        permalink: true,
        permalinkClass: 'header-anchor',
        permalinkSymbol: '#',
        permalinkBefore: true
      })
  const content = frontMatter(source)

  const output = Object.assign(
    {},
    content,
    { body:  markdownIt.render(content.body),
  })

  return `module.exports = ${JSON.stringify(output)}`
}
