<template>
<div>
  <div>
    <h1>
      4
      <img src="../assets/img/avatar.png" alt="0">
      4
    </h1>
    <router-link to="/" class="link"> Home </router-link>
  </div> 
</div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  margin: 1rem 0;
}

img {
  border-radius: 50%;
  width: 6rem;
  margin: 0 1rem;
}

.link {
  font-size: 2rem;
}
</style>