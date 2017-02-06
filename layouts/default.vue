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

<style>
.button,
.button:visited {
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover,
.button:focus {
  color: #fff;
  background-color: #3B8070;
}
</style>
