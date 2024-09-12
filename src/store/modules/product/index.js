import axios from "axios";

/** es el estado este dato cambiara con los datos  
 * 
 *  The state is a store object that holds the application-level data that needs to be shared between components.
*/
const state = {
  productItems: [],
};


/** cambia el estado de la variable 
 * 
 * Las mutaciones son métodos que modifican el estado de la tienda. Por lo general, constan de un tipo de cadena y un controlador que acepta el estado y la carga útil como parámetros.
*/
const mutations = {
  UPDATE_PRODUCT_ITEMS(state, payload) {
    state.productItems = payload;
  },
};

/** realiza una llamada axios y si es correcta usara la funcion UPDATE_PRODUCT_ITEMS 
 * 
 * Actions are methods that will handle mutations, so that mutations are insulated from the rest of your application code.
*/
const actions = {
  getProductItems({ commit }) {
    axios.get(`/api/products`).then((response) => {
      commit("UPDATE_PRODUCT_ITEMS", response.data);
    });
  },
};


/**
 * Devuelven la informacion 
 * Getters are to an application store what computed properties are to a component. They return computed information from store state methods that involve receiving computed state data.
 */
const getters = {
  productItems: (state) => state.productItems,
  productItemById: (state) => (id) => {
    return state.productItems.find((productItem) => productItem.id === id);
  },
};


const productModule = {
    state,
    mutations,
    actions,
    getters
  }
  
  export default productModule;