<template>
<article>
  <header>
    <h1>{{ post.title }}</h1>
    <small class="post-date">{{ formatDate(post.date) }}</small>
  </header>
  <section class="post-body" v-html="post.body"></section>
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
  padding: 1rem 2rem 4rem 2rem;
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

<style>
.post-body {
  /* inline code */
  & p > code {
    background-color: #f8f8f8;
    padding: .1rem .2rem;
    border-radius: 2px;
  }

  /* blockquote */
  & blockquote {
    color: #777;
    margin: 1rem;
    padding: 0 0 0 1rem;
    border-left: .2rem solid #ddd;
  }

  /* table */
  & table {
    border-collapse: collapse;

    & tr {
      background-color: #fff;

      &:nth-child(2n) {
        background: #f8f8f8;
      }
    }

    & th,
    & td {
      border: 1px solid #ddd;
      padding: .4rem .6rem;
    }
  }

  /* responsive image */
  & img {
    max-width: 100%;
    height: auto;
    display: block;
  }
}
</style>