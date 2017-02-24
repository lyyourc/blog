<template>
<div class="post-list" v-if="posts && posts.length > 0">
  <section class="post-entity"
    v-for="yearPosts in posts">
    <p class="post-year"
      v-if="yearPosts.year !== formatDate(new Date(), 'YYYY')">
      {{ yearPosts.year }} year
    </p>

    <div class="post-entry" :class="{ gutter: (index + 1) % 5 === 0 }"
      v-for="(post, index) in yearPosts.posts">
      <div class="post-date">
        <span class="post-day">
          {{ formatDate(post.date, 'DD') }}
        </span>
        <small>
          {{ formatDate(post.date, 'MMM') }}
        </small>
      </div>

      <h3 class="post-title">
        <router-link :to="{
          name: 'post',
          params: { id: post.number, post }
        }">
          {{ post.title }}
        </router-link>
      </h3>
    </div>
  </section>
</div>
</template>

<script>
import dateFns from 'date-fns'

import { sortPostsBySameYear } from '../utils/post'
import { fetchPosts } from '../services/post'

export default {
  data() {
    return {
      posts: [],
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    formatDate(date, format = 'YYYY-MM-DD') {
      return dateFns.format(date, format)
    },
    async getPosts() {
      if (this.$root.posts) {
        this.posts = this.$root.posts
        return
      }

      this.$Progress.start()

      try {
        const posts = await fetchPosts()
        this.$root.posts = this.posts = sortPostsBySameYear(posts)
      } catch ({ response }) {
        this.$OHNO.show({ code: response.status, msg: response.data })
      }

      this.$Progress.finish()
    },
  },
}
</script>

<style scoped>
.post-list {
  padding: 2rem 1rem;
}
.post-entity {
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}
.post-year {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: capitalize;
  color: #233;
  margin-top: 2rem;
}
.post-entry {
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: .5rem;
  }
  &.gutter:not(:last-child) {
    margin-bottom: 1.6rem;
  }
}
.post-date {
  flex: 1;
  text-align: center;
  letter-spacing: .5px;
  margin-right: .4rem;
}
.post-day {
  text-align: right;
  font-size: 1.2rem;
  font-weight: 900;
}
.post-title {
  flex: 5;
  min-width: 0;
  margin: 0;
  padding: .4rem;
  background: #f5f5f5;
  text-transform: capitalize;
  & a {
    display: block;
    color: #000;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>