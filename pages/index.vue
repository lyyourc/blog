<template>
  <section class="content">
    <figure>
      <img src="../assets/img/avatar.png" alt="avatar" class="avatar" />
    </figure>

    <h1 class="title"> {{ title }} </h1>
    <p> {{ bio }} </p>

    <ul class="social-list">
      <li class="social-item" v-for="social in socials">
        <a :href="social.link" target="_blank">{{ social.name }}</a>
      </li>
    </ul>
  </section>
</template>

<script>
import config from '../config.yml'

export default {
  data() {
    return { ...config }
  },
}
</script>

<style scoped>
.content {
  margin: 4rem 0;
  text-align: center;
}

.avatar {
  width: 15rem;
  height: 15rem;
  border-radius: 0.4rem;
}

.social-list {
  list-style: none;
  padding: 0;
  margin: 2rem;

  display: flex;
  justify-content: center;
}

.social-item {
  padding: .5rem 1rem;

  & a {
    text-decoration: none;
  }

  &:hover {
    background: #f5f5f5;
  }
}
</style>
