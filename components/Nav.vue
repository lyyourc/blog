<template>
<nav>
  <ul class="nav-list">
    <li class="nav-item" v-for="nav in navs">
      <nuxt-link :to="nav.path">{{ nav.name }}</nuxt-link>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { name: 'RSS', path: '/about' },
        { name: 'Post', path: '/posts', },
        { name: 'Home', path: '/' },
      ],
    }
  },
}
</script>

<style scoped>
.nav-list {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
}

.nav-item {
  padding: .5rem;

  /*& .nuxt-link-active {
    color: #fff;
    background-color: #5badf0;
  }*/
}

.nav-item a {
  text-decoration: none;
  text-transform: capitalize;
  font-size: 1.2rem;
}
</style>