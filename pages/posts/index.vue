<template>
<div class="post-list">
  <section class="post-entity"
    v-for="(postss, key) in posts">
    <p class="post-year"
      v-if="normalizePostYear(key) !== formatDate(new Date(), 'YYYY')">
      {{ normalizePostYear(key) }} year
    </p>

    <div class="post-entry" v-for="post in postss">
      <div class="post-date">
        <span class="post-day">
          {{ formatDate(post.date || post.created_at, 'DD') }}
        </span>
        <small>
          {{ formatDate(post.date || post.created_at, 'MMM') }}
        </small>
      </div>

      <h3 class="post-title">
        <nuxt-link :to="`/posts/${post.number}`">{{ post.title }}</nuxt-link>
      </h3>
    </div>
  </section>
</div>
</template>

<script>
import dateFns from 'date-fns'
import axios from 'axios'
import { sortPostsBySameYear } from '~/utils/post'

export default {
  async data ({ params, error }) {
    const url = 'https://api.github.com/repos/DrakeLeung/blog/issues'
    try {
      const res = await axios.get(url)
      return { posts: sortPostsBySameYear(res.data) }
    } catch (e) {
      error({ statusCode: 500, message: 'GitHub Api Request Failed' })
      console.error(e)
    }
  },

  methods: {
    formatDate(date, format = "YYYY-MM-DD") {
      return dateFns.format(date, format)
    },
    normalizePostYear(key) {
      return dateFns.format(key.replace('post', ''), 'YYYY')
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
}

.post-date {
  margin-right: 1.4rem;
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
    color: #000;
    text-decoration: none;
  }
}
</style>