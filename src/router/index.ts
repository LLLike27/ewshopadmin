import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";

const routes = [
  {
    path: "/",
    redirect: "/Login",
    // component: Home
  },
  {
    path: "/Login",
    component: Login,
    name: "Login",
    meta: {
      title: "登录",
    },
  },
];
const baseRoutes = [...routes];
const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes, // `routes: routes` 的缩写
});
router.beforeEach((to, _from, next) => {
  document.title = (to?.meta?.title as string) || document.title;

  next();
});
export default router;
