import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layout/auth.vue";
import HomeLayout from "../layout/home.vue";

const routes = [
  { path: "/", component: HomeLayout },
  { path: "/auth", component: AuthLayout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
