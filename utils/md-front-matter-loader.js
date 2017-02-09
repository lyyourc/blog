const MarkdownIt = require("markdown-it")
const frontMatter = require('front-matter')
const loaderUtils = require("loader-utils")

module.exports = function(source) {
  this.cacheable()
  // const options = loaderUtils.parseQuery(this.query)
  const markdownIt = new MarkdownIt()
  const content = frontMatter(source)

  const output = Object.assign(
    {},
    content,
    { body:  markdownIt.render(content.body),
  })

  return `module.exports = ${JSON.stringify(output)}`
}
