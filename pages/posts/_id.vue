<template>
<article>
  <header>
    <h1>{{ post.title }}</h1>
    <small class="post-date">{{ formatDate(post.date) }}</small>
  </header>
  <section v-html="parseMd(post.body)"></section>
</article>
</template>

<script>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import frontMatter from 'front-matter'
import dateFns from 'date-fns'

const markdownIt = new MarkdownIt({
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
})

export default {
  data() {
    return {
      post: {
        "id": 1,
        "date": "2017-08-12",
        "title": "让我们一起来学习 RxJS",
        "body": "Most [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements) have a hyphen in their name, so the highlighting for them is broken.\r\n\r\nExample:\r\n```html\r\n<tab-view>Hello world</tab-view>\r\n```\r\n\r\nCustom elements are quite common now, as they are used in Polymer and Angular 2, so I think support for them is important.",
        "created_at": "2017-10-23T13:33:48Z",
      },
    }
  },
  methods: {
    parseMd(md) {
      return markdownIt.render(frontMatter(md).body)
    },
    formatDate(date) {
      return dateFns.format(date, 'MMM DD YYYY')
    },
  },
}
</script>

<style scoped>
@import '~assets/css/github-md.css';

article {
  max-width: 980px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

header {
  text-align: center;
  margin-bottom: 4rem;
}

.post-date {
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
}
</style>