<template>
  <div class="pagination">
    <div
      v-for="page in pages"
      :key="page"
      class="pagination__page"
      :class="{
        'pagination__page--current': page === modelValue,
      }"
      @click="$emit('update:modelValue', page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'simple-pagination',
    props: {
      modelValue: {
        type: Number,
      },
      pages: {
        type: Number,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    justify-content: center;

    &__page {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid lightgray;
      min-width: 40px;
      border-radius: 5px;
      padding: 10px;
      margin-right: 5px;

      &:hover {
        border-color: blueviolet;
      }

      &--current {
        border: none;
        font-weight: bold;
        background: blueviolet;
        color: #fff;
      }
    }
  }
</style>