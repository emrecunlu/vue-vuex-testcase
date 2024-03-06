import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { store } from "./store";
import { computed } from "vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/pages/layouts/DashboardLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        component: () => import("@/pages/dashboard/DashboardPage.vue"),
        name: "Dashboard",
      },
    ],
  },
  {
    path: "/signin",
    component: () => import("@/pages/auth/SigninPage.vue"),
    name: "Login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const user = store.getters.isLoggedIn;

  if (user && to.name === "Login") return next({ name: "Dashboard" });

  if (!user && to.meta.requiresAuth) return next({ name: "Login" });

  next();
});

export default router;
