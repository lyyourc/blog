<template>
<div class="post-list">
  <section class="post-entity"
    v-for="(posts, key) in sortPostsBySameYear(posts)">
    <p class="post-year"
      v-if="normalizePostYear(key) !== formatDate(new Date(), 'YYYY')">
      {{ normalizePostYear(key) }} year
    </p>

    <div class="post-entry" v-for="post in posts">
      <div class="post-date">
        <span class="post-day">{{ formatDate(post.created_at, 'DD') }}</span>
        <small>{{ formatDate(post.created_at, 'MMM') }}</small>
      </div>

      <h3 class="post-title">
        <nuxt-link :to="`/posts/${post.id}`">{{ post.title }}</nuxt-link>
      </h3>
    </div>
  </section>
</div>
</template>

<script>
import dateFns from 'date-fns'
import frontMatter from 'front-matter'

export default {
  data() {
    return {
      posts: [
        {
          "id": 2,
          "title": "Found a bug",
          "body": "I'm having a problem with this.",
          "created_at": "2011-04-22T13:33:48Z",
        },
        {
          "id": 4,
          "title": "Why Vue.js?",
          "body": "I'm having a problem with this.",
          "created_at": "2017-06-12T13:33:48Z",
        },
        {
          "id": 1,
          "title": "Let's Learn JavaScript",
          "body": "---\r\ntitle: test for api\r\ndescription: Nothing to see here\r\ndate: 2016-03-01 17:11:29\r\n---\r\n\r\nThis issue is a test, 4 fetch GitHub issue api `api.github.com/repos/:owner/:repo/issue`",
          "created_at": "2017-10-23T13:33:48Z",
        },
        {
          "id": 3,
          "title": "Agent of Shield",
          "body": "I'm having a problem with this.",
          "created_at": "2014-11-17T13:33:48Z",
        },
      ],
    }
  },

  methods: {
    formatDate(time, format = "YYYY-MM-DD") {
      return dateFns.format(time, format)
    },
    sortPostsBySameYear(posts) {
      return posts
        .slice().sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at)
        })
        .reduce((prev, post) => {
          const newPost = Object.assign(
            frontMatter(post.body).attributes || {}, post)
          const year = `post${post.created_at}`
          const postsOfSameYear = prev[year] || []

          postsOfSameYear.push(newPost)
          prev[year] = postsOfSameYear
          return prev
        }, {})
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