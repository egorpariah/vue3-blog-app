<template>
  <input 
    :value="modelValue" 
    @input="updateInput" 
    class="input" 
    type="text"
  >
</template>

<script>
  export default {
    name: 'simple-input',
    props: {
      modelValue: [String, Number]
    },
    methods: {
      updateInput(e) {
        this.$emit('update:modelValue', e.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px 15px;
    outline: none;
    width: 100%;

    &:focus {
      border-color: lightslategray;
    };
  }
</style>