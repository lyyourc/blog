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
export default {
  data() {
    return {
      title: 'lyyourc',
      bio: 'Web / Google-oriented programming',
      socials: [
        { name: 'GitHub', link: 'https://github.com/DrakeLeung' },
        { name: 'Weibo', link: 'http://weibo.com/cha12chalyc/' },
        { name: 'Twitter', link: 'https://twitter.com/DrakeLeung' },
      ],
    }
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

  display: flex;
  justify-content: center;
}

.social-item {
  margin: 0 1rem;

  & a {
    text-decoration: none;
  }
}
</style>
