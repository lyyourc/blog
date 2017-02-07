<template>
  <div class="container">
    <my-nav/>
    <main>
      <nuxt/>
    </main>
    <my-footer/>
  </div>
</template>

<script>
import MyNav from '~components/Nav.vue'
import MyFooter from '~components/Footer.vue'

export default {
  components: {
    MyNav,
    MyFooter,
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  position: relative;
}

</style>
