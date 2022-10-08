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
import axios from 'axios';

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      modalVisibility: false,
      isPostsLoading: false,
      isPostsAdding: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'Name' },
        { value: 'body', name: 'Description' },
        { value: 'id', name: 'ID' },
      ]
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.modalVisibility = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showModal() {
      this.modalVisibility = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Error!')
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.isPostsAdding = true;
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Error!')
      } finally {
        this.isPostsAdding = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return this.selectedSort !== 'id' ?
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]) :
          (post1[this.selectedSort] - post2[this.selectedSort]);
      });
    },
    searchedAndSortedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
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
