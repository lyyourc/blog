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
import dateFns from 'date-fns'
import { fetchPosts } from '~/utils/post'

export default {
  created() {
    const { id } = this.$route.params
    const posts = this.$root.posts || (this.$root.posts = fetchPosts())
    
    this.post = posts.find(p => p.key === id)
  },
  methods: {
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