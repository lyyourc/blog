<template>
<div class="post-list">
  <section class="post-entity"
    v-for="(postss, key) in posts">
    <p class="post-year"
      v-if="key !== formatDate(new Date(), 'YYYY')">
      {{ key }} year
    </p>

    <div class="post-entry" v-for="post in postss">
      <div class="post-date">
        <span class="post-day">
          {{ formatDate(post.date, 'DD') }}
        </span>
        <small>
          {{ formatDate(post.date, 'MMM') }}
        </small>
      </div>

      <h3 class="post-title">
        <nuxt-link :to="`/posts/${post.key}`">{{ post.title }}</nuxt-link>
      </h3>
    </div>
  </section>
</div>
</template>

<script>
import dateFns from 'date-fns'
import axios from 'axios'
import { fetchPosts, sortPostsBySameYear } from '~/utils/post'

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
}

.post-date {
  margin-right: 1.4rem;
  letter-spacing: .5px;
  width: 14%;
  text-align: right;
}
.post-day {
  font-size: 1.2rem;
  font-weight: 900;
  margin-right: .4rem;
}

.post-title {
  flex: 1;
  margin: 0;
  padding: .4rem;
  background: #f5f5f5;
  text-transform: capitalize;

  & a {
    display: block;
    color: #000;
    text-decoration: none;
  }
}
</style>