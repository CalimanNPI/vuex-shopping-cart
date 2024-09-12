import { createRouter, createWebHistory } from "vue-router";
import CartList from '../components/cart/Cart_List.vue';
import ProductList from '../components/product/Product_List.vue';

const routes = [
  //{
  //  path: "/about",
  //  name: "about",
  //  // route level code-splitting
  //  // this generates a separate chunk (about.[hash].js) for this route
  //  // which is lazy-loaded when the route is visited.
  //  component: () =>
  //    import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  //},
  {
    path: "/inventory",
    name: "hominventorye",
    component: ProductList,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartList,
  },
  {
    path: "/",
    redirect: "/inventory",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
