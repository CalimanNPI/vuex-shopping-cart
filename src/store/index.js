import { createStore } from "vuex";
import product from "./modules/product";
import cart from "./modules/cart";
import checkout from "./modules/cart/checkout";
import authModule from "./modules/auth";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    product,
    cart,
    checkout,
    authModule,
  },
});
