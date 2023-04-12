import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberFloors: parseInt(localStorage.getItem('numberFloors'), 10) || 5
  },
  mutations: {
    SET_NUMBER_FLOORS(state, number) {
      state.numberFloors = number;
    }
  },
  actions: {
    setNumberFloors({ commit }, number) {
      commit('SET_NUMBER_FLOORS', number);
      localStorage.setItem('numberFloors', parseInt(number, 10));
    },
    getNumberFloors({ commit }) {
      const number = parseInt(localStorage.getItem('numberFloors'), 10);
      if (number) {
        commit('SET_NUMBER_FLOORS', number);
      }
    }
  },
  modules: {}
});
