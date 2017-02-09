<template>
<article>
  <header>
    <h1>{{ post.title }}</h1>
    <small class="post-date">{{ formatDate(post.date) }}</small>
  </header>
  <section v-html="post.body"></section>
</article>
</template>

<script>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import frontMatter from 'front-matter'
import dateFns from 'date-fns'
import axios from 'axios'
import { fetchPosts } from '~/utils/post'

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
  async data({ params, error } = {}) {
    const postId = params.id
    // const url = `https://api.github.com/repos/DrakeLeung/blog/issues/${postId}`

    // try {
    //   const res = await axios.get(url)
    //   return { post: setFrontMatterForPost(res.data) }
    // } catch (e) {
    //   error({ statusCode: 500, message: 'GitHub Api Request Failed' })
    //   console.error(e)
    // }
  },
  created() {
    const { id } = this.$route.params
    const posts = this.$root.posts || (this.$root.posts = fetchPosts())
    
    this.post = posts.find(p => p.key === id)
  },
  methods: {
    // parseMd(md) {
    //   return markdownIt.render(frontMatter(md).body)
    // },
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