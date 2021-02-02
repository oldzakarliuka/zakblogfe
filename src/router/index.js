import { createRouter, createWebHistory } from "vue-router";
import AdminDashboard from "../components/AdminDashboard.vue";
import AuthForm from "../components/AuthForm.vue";
import AuthSignup from "../components/AuthSignup.vue";
import HomeDashboard from "../components/Dashboard.vue";
import Post from "../components/Post.vue";
import PostForm from "../components/PostForm.vue";
import AdminLayout from "../layout/admin.vue";
import HomeLayout from "../layout/home.vue";
import NotFound from "../layout/notfound.vue";
import TokenService from "../service/storage.service";
import store from "../store";

const redirectToAdminDashboard = (to, from, next) => {
  if (TokenService.getToken()) {
    next("/admin/dashboard");
  } else next();
};

const routes = [
  {
    path: "/",
    component: HomeLayout,
    children: [
      { path: "", component: HomeDashboard },
      {
        path: "post/:id",
        component: Post,
        beforeEnter: (to, from, next) => {
          if (!store.getters.getSelectedPost) next("/");
          else next();
        },
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,

    children: [
      { path: "", component: AuthForm, beforeEnter: redirectToAdminDashboard },
      {
        path: "signup",
        component: AuthSignup,
        beforeEnter: redirectToAdminDashboard,
      },
      {
        path: "dashboard",
        component: AdminDashboard,
        meta: {
          protected: true,
        },
      },
      {
        path: "create",
        component: PostForm,
        meta: {
          protected: true,
        },
      },
      {
        path: "post/:id",
        component: PostForm,
        meta: {
          protected: true,
        },
        beforeEnter: (to, from, next) => {
          if (!store.getters.getEditPost) next("/");
          else next();
        },
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.protected && !TokenService.getToken()) next({ path: "/admin" });
  else next();
});

export default router;
