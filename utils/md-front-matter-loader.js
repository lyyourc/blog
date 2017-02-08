const MarkdownIt = require("markdown-it")
const frontMatter = require('front-matter')
const loaderUtils = require("loader-utils")

module.exports = function(source) {
  this.cacheable()
  // const options = loaderUtils.parseQuery(this.query)
  const markdownIt = new MarkdownIt()

  const output = Object.assign(
    {},
    frontMatter(source),
    { body:  markdownIt.render(source),
  })

  return `module.exports = ${JSON.stringify(output)}`
}
