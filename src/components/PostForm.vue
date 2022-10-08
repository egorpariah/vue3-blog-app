<template>
  <form @submit.prevent class="form">
    <h3 class="form__title">Create a post</h3>
    <simple-input v-focus v-model="post.title" class="form__input input" type="text" placeholder="Title" />
    <simple-input v-model="post.body" class="form__input input" type="text" placeholder="Description" />
    <simple-button class="form__button" @click.prevent="createPost">
      Create
    </simple-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 20px;
  }

  &__input {
    margin-bottom: 10px;
  }

  &__button {
    align-self: flex-end;
  }
}
</style>