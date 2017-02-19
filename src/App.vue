<template>
  <div>
    <my-nav></my-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import MyNav from './components/Nav.vue'
export default {
  components: { MyNav },
}
</script>