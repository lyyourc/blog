<template>
<nav>
  <ul class="nav-list">
    <li class="nav-item" v-for="nav in navs">
      <router-link :to="nav.path">{{ nav.name }}</router-link>
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
nav {
  /*background: #f5f5f5;*/
  border-bottom: 1px solid #f5f5f5;
}
.nav-list {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
}
.nav-item {
  padding: .1rem .8rem;
  &:last-child {
    padding-right: 0;
  }
}
.nav-item a {
  text-decoration: none;
  text-transform: capitalize;
  font-size: 1.2rem;
  color: #000;
  font-weight: bold;
}
</style>