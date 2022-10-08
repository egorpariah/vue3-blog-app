<template>
  <div v-if="posts.length > 0" class="list">
    <h2 class="list__title">Posts</h2>
    <transition-group name="posts-list">
      <post-item
        class="list__post"
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else>There are no posts</h2>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  &__title {
    margin-bottom: 20px;
  }

  &__post {
    margin-bottom: 20px;
  }
}

.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}

.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.3s ease;
}

.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.posts-list-move {
  transition: transform 0.3s ease;
}
</style>
