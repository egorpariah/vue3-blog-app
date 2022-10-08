<template>
  <div class="post">
    <div class="post__content">
      <div class="post__id">#{{post.id}}</div>
      <div class="post__title"><b>Title:</b> {{post.title}}</div>
      <div><b>Description:</b> {{post.body}}</div>
    </div>
    <div class="post__buttons">
      <simple-button @click="$router.push(`/posts/${post.id}`)" class="post__button">
        Open
      </simple-button>
      <simple-button @click="$emit('remove', post)" class="post__button button--remove">
        Delete
      </simple-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  min-height: 150px;

  &__content {
    margin-right: 20px;
  }

  &__buttons {
    display: flex;
  }

  &__button {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__id {
    color: lightgray;
    position: absolute;
    right: 20px;
    top: 20px;
  }

  &__title {
    margin-bottom: 10px;
  }
}
</style>