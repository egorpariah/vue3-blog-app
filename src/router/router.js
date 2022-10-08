import Main from "@/pages/Main";
import Posts from "@/pages/Posts";
import PostsVuex from "@/pages/PostsVuex";
import PostsCompositionApi from "@/pages/PostsCompositionApi";
import Post from "@/pages/Post";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: Posts,
  },
  {
    path: "/store",
    component: PostsVuex,
  },
  {
    path: "/composition",
    component: PostsCompositionApi,
  },
  {
    path: "/posts/:id",
    component: Post,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/vue3-blog-app/" : "/"
  ),
});

export default router;
