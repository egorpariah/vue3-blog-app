<template>
  <div class="modal" v-if="show" @click="hideModal">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
  name: 'simple-modal',
  mixins: [toggleMixin],
}
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: rgba(47, 79, 79, 0.7);

  &__content {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    min-height: 100px;
    min-width: 300px;
  }
}
</style>