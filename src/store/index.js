import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberFloors: parseInt(localStorage.getItem('numberFloors'), 10),
    numberShafts: parseInt(localStorage.getItem('numberShafts'), 10),
    currentFloor: parseInt(localStorage.getItem('currentFloor'), 10),
    nextFloor: parseInt(localStorage.getItem('nextFloor'), 10),
    step: parseInt(localStorage.getItem('step'), 10),
    queueFloors: JSON.parse(localStorage.getItem('queueFloors'))
  },
  mutations: {
    SET_STATE_PROPERTY(state, { property, value }) {
      state[property] = value;
    }
  },
  actions: {
    setPropertyValue({ commit }, { property, value }) {
      commit('SET_STATE_PROPERTY', { property, value });
      localStorage.setItem(property, parseInt(value, 10));
    },
    getPropertyValue({ commit }, property) {
      const value = parseInt(localStorage.getItem(property), 10);
      if (value) {
        commit('SET_STATE_PROPERTY', { property, value });
      }
    },
    setPropertyArray({ commit }, { property, array }) {
      commit('SET_STATE_PROPERTY', { property, value: array });
      localStorage.setItem(property, JSON.stringify(array));
    },
    getPropertyArray({ commit }, property) {
      const array = JSON.parse(localStorage.getItem(property));
      if (array) {
        commit('SET_STATE_PROPERTY', { property, value: array });
      }
    }
  },
  modules: {}
});
