import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function getValueFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? parseInt(value, 10) : null;
}

function getArrayFromLocalStorage(property) {
  const array = JSON.parse(localStorage.getItem(property));
  return array || null;
}

export default new Vuex.Store({
  state: {
    numberFloors: 5,
    numberShafts: 1,
    currentFloor: 0,
    nextFloor: 1,
    step: 0,
    queueFloors: [1]
  },
  mutations: {
    RESET_STATE(state) {
      state.numberFloors = 5;
      state.numberShafts = 1;
      state.currentFloor = 0;
      state.nextFloor = 1;
      state.step = 0;
      state.queueFloors = [1];
    },
    SET_STATE_PROPERTY(state, { property, value }) {
      state[property] = value;
    }
  },
  actions: {
    resetState({ commit }) {
      commit('RESET_STATE');
    },
    setPropertyValue({ commit }, { property, value }) {
      commit('SET_STATE_PROPERTY', { property, value });
      localStorage.setItem(property, parseInt(value, 10));
    },
    getPropertyValue({ commit }, property) {
      const value = getValueFromLocalStorage(property);
      if (value !== null) {
        commit('SET_STATE_PROPERTY', { property, value });
      }
    },
    setPropertyArray({ commit }, { property, array }) {
      commit('SET_STATE_PROPERTY', { property, value: array });
      localStorage.setItem(property, JSON.stringify(array));
    },
    getPropertyArray({ commit }, property) {
      const array = getArrayFromLocalStorage(property);
      if (array !== null) {
        commit('SET_STATE_PROPERTY', { property, value: array });
      }
    }
  },
  modules: {}
});
