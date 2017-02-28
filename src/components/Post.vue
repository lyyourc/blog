<template>
<article v-if="post">
  <header>
    <h1 class="post-title">{{ post.title }}</h1>
    <small class="post-date">{{ formatDate(post.date) }}</small>
  </header>
  <section class="post-body" v-html="post.body"></section>
</article>
</template>

<script>
import dateFns from 'date-fns'
import { fetchPost } from '../services/post'

export default {
  data() {
    return {
      post: null,
    }
  },
  created() {
    this.getPost()
  },
  methods: {
    formatDate(date) {
      return dateFns.format(date, 'MMMM DD YYYY')
    },
    async getPost() {
      const { id, post } = this.$route.params

      if (this.post || post) {
        this.post = this.post || post
        return
      }

      this.$Progress.start()

      try {
        this.post = await fetchPost(id)
        this.$Progress.finish()
      } catch (err) {
        this.$OHNO.show(err)
      }

      this.$Progress.finish()
    }
  },
}
</script>

<style scoped>
@import '../assets/css/github-highlight.css';

article {
  padding: 1rem 2rem 4rem 2rem;
}
header {
  text-align: center;
  margin-bottom: 4rem;
}
.post-title {
  text-transform: capitalize;
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
  /* markdown-it-anchor */
  & .header-anchor {
    text-decoration: none;
  }
  & h3 {
    &:hover .header-anchor,
    &:active .header-anchor,
    &:focus .header-anchor {
      display: inline;
    }
    & .header-anchor {
      display: none;
    }
  }

  /* heading margin-top */
  & h2 { margin-top: 3rem; }
  & h3 { margin-top: 2rem; }
  & h4 { margin-top: 1.5rem; }

  /* <ul> padding start */
  & ul {
    padding-left: 2rem;
  }
}
</style>