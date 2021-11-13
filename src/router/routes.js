import AUTH from "./guard/index";
const routes = [
  {
    path: "/login",
    component: () => import("pages/Login"),
    beforeEnter: AUTH.logged,
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        beforeEnter: AUTH.isLogged,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
