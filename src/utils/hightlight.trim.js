// This will be used in 'webpack.config.js' file,
// So can't use 'import' syntax?
const hljs = require('highlight.js/lib/highlight')

const HIGHLIGHT_LANGUAGE = [
  'javascript',
  'xml',
  'css',
  'markdown',
  'nginx',
  'python',
]

HIGHLIGHT_LANGUAGE.forEach(langName => {
  const langModule = require(`highlight.js/lib/languages/${langName}`)
  hljs.registerLanguage(langName, langModule)
})

module.exports = {
  HIGHLIGHT_LANGUAGE,
  hljs,
}
