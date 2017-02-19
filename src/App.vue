<template>
  <div class="container">
    <my-nav></my-nav>
    <main>
      <router-view></router-view>
    </main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyNav from './components/Nav.vue'
import MyFooter from './components/Footer.vue'

export default {
  components: { MyNav, MyFooter },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 780px;
  margin: 0 auto;
}
main {
  flex: 1;
  position: relative;
}
</style>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --blue-color: #5badf0;
  --gray-color: #f5f5f5;
  --pink-color: #EB298C;

  /*没有衬线，在屏幕上更容易识别*/
  --font-sans: "PingFang SC", Verdana, "Helvetica Neue",
    "Microsoft Yahei", "Hiragino Sans GB",
    "Microsoft Sans Serif", "WenQuanYi Micro Hei", sans-serif;

  /*有衬线，即是字母末尾有小细线，通常用于新闻报纸*/
  --font-serif: Georgia, "Times New Roman", serif;

  /*等宽的字符，也就是水平方向的宽度是相同的，常用于代码实例*/
  --font-mono: "Source Code Pro", Consolas, Monaco, Menlo, monospace;

  font-size: responsive 12px 16px;
}

body {
  background-color: #fff;
  font-family: var(--font-sans);
  margin: 0;
}

a,
a:hover,
a:focus,
a:visited {
  color: var(--blue-color);
}

.page-enter-active,
.page-leave-active {
  transition: opacity .5s
}
.page-enter,
.page-leave-active {
  opacity: 0
}
</style>