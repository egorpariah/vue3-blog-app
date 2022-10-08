<template>
  <div class="posts">
    <h1 class="posts__title">Posts in blog</h1>
    <simple-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search..."
      class="posts__search" />
    <div class="posts__controls">
      <simple-button @click="showModal" class="posts__show-button">
        Create post
      </simple-button>
      <simple-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      modalVisibility: false,
      sortOptions: [
        { value: "title", name: "Name" },
        { value: "body", name: "Description" },
        { value: "id", name: "ID" },
      ],
    };
  },
  methods: {
    ...mapMutations({
      setPosts: 'post/setPosts',
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.modalVisibility = false;
    },
    removePost(post) {
      this.setPosts(this.posts.filter(p => p.id !== post.id))
    },
    showModal() {
      this.modalVisibility = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      isPostsAdding: state => state.post.isPostsAdding,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      searchedAndSortedPosts: 'post/searchedAndSortedPosts',
    }),
  },
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
