import axios from "axios";

/** es el estado este dato cambiara con los datos
 *
 *  The state is a store object that holds the application-level data that needs to be shared between components.
 */
const state = {
  shipping: [], // envio
  bill: "", // Factura o Ticket
  terms: "", // Acepto los Términos y condiciones
  facts: "", // Confirmo que no necesito Factura
  addres: [],
  delivery: [],
  total: [],
};

/** cambia el estado de la variable
 *
 * Las mutaciones son métodos que modifican el estado de la tienda. Por lo general, constan de un tipo de cadena y un controlador que acepta el estado y la carga útil como parámetros.
 */
const mutations = {
  UPDATE_SHIPPING(state, payload) {
    state.shipping = payload;
  },
  UPDATE_DELIVERY(state, payload) {
    state.delivery = payload;
  },
  UPDATE_TOTAL(state, payload) {
    state.total = payload;
  },
};

/** realiza una llamada axios y si es correcta usara la funcion UPDATE_PRODUCT_ITEMS
 *
 * Actions are methods that will handle mutations, so that mutations are insulated from the rest of your application code.
 */
const actions = {
 
  getDeliverys({ commit }) {
    axios.get("/api/delivery").then((response) => {
      commit("UPDATE_DELIVERY", JSON.parse(response.data));
    });
  },
 
};

/**
 * Devuelven la informacion
 * Getters are to an application store what computed properties are to a component. They return computed information from store state methods that involve receiving computed state data.
 */
const getters = {
  shipping: (state) => state.shipping,
  delivery: (state) => state.delivery,
  totalCart: (state) => state.total,
};

const checkoutModule = {
  state,
  mutations,
  actions,
  getters,
};

export default checkoutModule;
