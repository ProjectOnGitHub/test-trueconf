import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberFloors: parseInt(localStorage.getItem('numberFloors'), 10),
    numberShafts: parseInt(localStorage.getItem('numberShafts'), 10),
    queueFloors: JSON.parse(localStorage.getItem('queueFloors'))
  },
  mutations: {
    SET_NUMBER_FLOORS(state, number) {
      state.numberFloors = number;
    },
    SET_NUMBER_SHAFTS(state, number) {
      state.numberShafts = number;
    },
    SET_QUEUE_FLOORS(state, array) {
      state.queueFloors = array;
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
    },
    setNumberShafts({ commit }, number) {
      commit('SET_NUMBER_SHAFTS', number);
      localStorage.setItem('numberShafts', parseInt(number, 10));
    },
    getNumberShafts({ commit }) {
      const number = parseInt(localStorage.getItem('numberShafts'), 10);
      if (number) {
        commit('SET_NUMBER_SHAFTS', number);
      }
    },
    setQueueFloors({ commit }, array) {
      commit('SET_QUEUE_FLOORS', array);
      localStorage.setItem('queueFloors', JSON.stringify(array));
    },
    getQueueFloor({ commit }) {
      const array = parseInt(localStorage.getItem('queueFloors'), 10);
      if (array) {
        commit('SET_QUEUE_FLOORS', array);
      }
    }
  },
  modules: {}
});
