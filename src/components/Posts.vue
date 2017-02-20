<template>
<div class="post-list">
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
        <router-link :to="`/posts/${post.key}`">{{ post.title }}</router-link>
      </h3>
    </div>
  </section>
</div>
</template>

<script>
import dateFns from 'date-fns'
import { fetchPosts, sortPostsBySameYear } from '../utils/post'

export default {
  created() {
    const posts = this.$root.posts || (this.$root.posts = fetchPosts())
    this.posts = sortPostsBySameYear(posts)
  },
  methods: {
    formatDate(date, format = 'YYYY-MM-DD') {
      return dateFns.format(date, format)
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