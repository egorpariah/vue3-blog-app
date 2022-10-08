<template>
  <div class="posts">
    <h1 class="posts__title">Posts in blog</h1>
    <simple-input v-model="searchQuery" placeholder="Search..." class="posts__search" />
    <div class="posts__controls">
      <simple-button @click="showModal" class="posts__show-button">
        Create post
      </simple-button>
      <simple-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <simple-modal v-model:show="modalVisibility">
      <post-form @create="createPost" />
    </simple-modal>
    <post-list :posts="searchedAndSortedPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else class="posts__preloader">Loading...</div>
    <div v-if="!isPostsLoading" v-intersection="loadMorePosts" class="posts__observer"
      :class="{ 'posts__preloader' : isPostsAdding }"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { ref } from 'vue';
import useFetchPosts from '@/hooks/useFetchPosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSearchedAndSortedPosts from '@/hooks/useSearchedAndSortedPosts';

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      sortOptions: [
        { value: 'title', name: 'Name' },
        { value: 'body', name: 'Description' },
        { value: 'id', name: 'ID' },
      ]
    };
  },
  setup(props) {
    const { posts, page, totalPages, isPostsLoading, isPostsAdding, loadMorePosts } = useFetchPosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, searchedAndSortedPosts } = useSearchedAndSortedPosts(sortedPosts)

    const modalVisibility = ref(false);
    const createPost = (post) => {
      posts.value.push(post);
      modalVisibility.value = false;
    };
    const removePost = (post) => {
      posts.value = posts.value.filter(p => p.id !== post.id)
    };
    const showModal = () => {
      modalVisibility.value = true;
    };

    return {
      posts,
      page,
      totalPages,
      isPostsLoading,
      isPostsAdding,
      loadMorePosts,
      selectedSort,
      sortedPosts,
      searchQuery,
      searchedAndSortedPosts,
      modalVisibility,
      createPost,
      removePost,
      showModal,
    }
  }
}
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 30px;
  }

  &__search {
    margin-bottom: 20px;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  &__preloader {
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: lightgray;
    height: 20px;

    &::before {
      content: '';
      display: block;
      border-radius: 50%;
      margin-right: 10px;
      width: 15px;
      height: 15px;
      border: 2px solid lightgray;
      border-top-color: blueviolet;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }

  &__observer {
    height: 0px;
    align-self: center;
  }
}
</style>
