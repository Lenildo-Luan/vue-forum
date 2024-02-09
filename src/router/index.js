import { createRouter, createWebHistory } from "vue-router";
import { findById } from "@/helpers";

import Home from "@/pages/Home";
import ThreadShow from "@/pages/ThreadShow";
import NotFound from "@/pages/NotFound";
import Forum from "@/pages/Forum";
import Category from "@/pages/Category";
import Profile from "@/pages/Profile";
import ThreadCreate from "@/pages/ThreadCreate";
import ThreadEdit from "@/pages/ThreadEdit";

import sourceData from "@/data.json";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // check if thread exists
      const threadExists = findById(sourceData.threads, to.params.id);
      // if exists continue
      if (threadExists) {
        return next();
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          // preserve existing query and hash
          query: to.query,
          hash: to.hash,
        });
      }
      // if doesnt exist redirect to not found
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: Forum,
    props: true,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true,
  },
  {
    path: "/me",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: Profile,
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreate",
    component: ThreadCreate,
    props: true,
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: ThreadEdit,
    props: true,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = "smooth";
    return scroll;
  },
});
