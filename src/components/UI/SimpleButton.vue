<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'simple-button'
}
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 15px;
  background: blueviolet;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  border: none;

  &:hover {
    background: violet;
  }

  &--remove {
    background: none;
    border: 1px solid blueviolet;
    color: blueviolet;

    &:hover {
      color: #fff;
      background: blueviolet;
    }
  }
}
</style>