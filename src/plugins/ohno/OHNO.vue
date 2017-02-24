<template>
<div class="oh-no" v-show="ohno && ohno.isShow">
  <h1> {{ ohno.error.code }}</h1>
  <p> {{ ohno.error.msg }} </p>
</div>
</template>

<script>
export default {
  computed: {
    ohno() {
      return this.$OHNO || {}
    },
  },
}
</script>

<style scoped>
.oh-no {
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
}
</style>