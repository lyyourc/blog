<template>
  <section class="container">
    <!--<img src="../assets/img/logo.png" alt="Nuxt.js Logo" />-->

    <h1 class="title">{{ error.statusCode }}</h1>
    <h2 class="info">{{ error.message }}</h2>

    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      Home
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 4rem;
}

.title {
  font-size: 3.6rem;
  margin: 1rem;
}

.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 1rem;
}

.button {
  margin-top: 50px;
}
</style>
