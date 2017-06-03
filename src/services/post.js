import axios from  'axios'
import MarkdownIt from "markdown-it"
import markdownItAnchor from 'markdown-it-anchor'
import frontMatter from 'front-matter'

import { hljs } from '../utils/highlight-trim'

/**
 * 
 */
export const fetchPost = async (
  id
) => {
  const url = '//api.github.com/repos/DrakeLeung/blog/issues/'
  const { data } = await axios.get(url + id)
  return Object.assign({}, data, parseMarkdown(data.body))
}

export const fetchPosts = async () => {
  const url = '//api.github.com/repos/DrakeLeung/blog/issues?labels=post'
  const { data } = await axios.get(url)

  return data.map(post => Object.assign({}, post, parseMarkdown(post.body)))
}


function parseMarkdown(source) {
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
        (new MarkdownIt()).utils.escapeHtml(str) +
        '</code></pre>'
    },
  }

    const markdownIt = new MarkdownIt(options)
      .use(markdownItAnchor, {
        level: 2,
        permalink: true,
        permalinkClass: 'header-anchor',
        permalinkSymbol: '#',
        permalinkBefore: true
      })
  const content = frontMatter(source)

  return Object.assign(
    {},
    content.attributes,
    { body:  markdownIt.render(content.body),
  })
}