<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  components: { Navbar }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: slategray;
  font-family: Arial, Helvetica, sans-serif;
}

b {
  font-weight: normal;
  color: darkslategray;
}

button {
  cursor: pointer;
}

.app {
  padding: 40px;
}
</style>