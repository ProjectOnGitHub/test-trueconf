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
    SET_NUMBER_FLOORS(state, number) {
      state.numberFloors = number;
    },
    SET_NUMBER_SHAFTS(state, number) {
      state.numberShafts = number;
    },
    SET_QUEUE_FLOORS(state, array) {
      state.queueFloors = array;
    },
    SET_CURRENT_FLOOR(state, number) {
      state.currentFloor = number;
    },
    SET_NEXT_FLOOR(state, number) {
      state.nextFloor = number;
    },
    SET_STEP(state, number) {
      state.step = number;
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
    setCurrentFloor({ commit }, number) {
      commit('SET_CURRENT_FLOOR', number);
      localStorage.setItem('currentFloor', parseInt(number, 10));
    },
    getCurrentFloor({ commit }) {
      const number = parseInt(localStorage.getItem('currentFloor'), 10);
      if (number) {
        commit('SET_CURRENT_FLOOR', number);
      }
    },
    setStep({ commit }, number) {
      commit('SET_STEP', number);
      localStorage.setItem('step', parseInt(number, 10));
    },
    getStep({ commit }) {
      const number = parseInt(localStorage.getItem('step'), 10);
      if (number) {
        commit('SET_STEP', number);
      }
    },
    setNextFloor({ commit }, number) {
      commit('SET_NEXT_FLOOR', number);
      localStorage.setItem('nextFloor', parseInt(number, 10));
    },
    getNextFloor({ commit }) {
      const number = parseInt(localStorage.getItem('nextFloor'), 10);
      if (number) {
        commit('SET_NEXT_FLOOR', number);
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
