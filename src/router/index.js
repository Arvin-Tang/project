import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "../views/login"),
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "about" */ "../views/404"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/register"),
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/homePage"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("token");
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});
export default router;
