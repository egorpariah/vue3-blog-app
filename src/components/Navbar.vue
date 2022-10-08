<template>
  <div class="navbar">
    <a class="navbar__title" @click="$router.push('/')">Vue 3 Blog App</a>
    <div class="navbar__buttons">
      <simple-button class="navbar__button" @click="$router.push('/posts')">Vue 3</simple-button>
      <simple-button class="navbar__button" @click="$router.push('/store')">Vuex</simple-button>
      <simple-button class="navbar__button" @click="$router.push('/composition')">Composition API</simple-button>
    </div>
  </div>
</template>
      
<script>
export default {
}
</script>
      
<style lang="scss" scoped>
.navbar {
  padding: 10px 40px 0;
  min-height: 50px;
  background: lightgray;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;

  &__title {
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 10px;
  }

  &__buttons {
    margin-left: auto;
  }

  &__button {
    margin-right: 10px;
    margin-bottom: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
