import axios from "axios";
import { ref, onMounted } from "vue";

export default function useFetchPosts(limit) {
  const posts = ref([]);
  const page = ref(1);
  const totalPages = ref(0);
  const isPostsLoading = ref(true);
  const isPostsAdding = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: page,
            _limit: limit,
          },
        }
      );
      totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
      posts.value = response.data;
    } catch (e) {
      alert("Error!");
    } finally {
      isPostsLoading.value = false;
    }
  };

  const loadMorePosts = async () => {
    try {
      page.value += 1;
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: page.value,
            _limit: limit,
          },
        }
      );
      posts.value = [...posts.value, ...response.data];
    } catch (e) {
      alert("Error!");
    } finally {
      isPostsAdding.value = false;
    }
  };

  onMounted(fetching);

  return {
    posts,
    page,
    totalPages,
    isPostsLoading,
    isPostsAdding,
    loadMorePosts,
  };
}
