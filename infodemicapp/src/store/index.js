import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topics: ['マスク', 'Covid-19', 'コロナ', 'ワクチン'], 
    monthRange: ['2'],
    chips: {},
    topic: {},
    month: 2,
    yearRange: ['2020'],
    showDate: 'year',
    graphPointLabel: {},
  },
  mutations: {
    setTopic(state, {val, index}){
      Vue.set(state.topic, index, val)
    },
    setMonth(state, val){
      state.month = val
    },
    setChips(state, {val, index}){
      Vue.set(state.chips, index, val)
    },
    setShowDate(state, val){
      state.showDate = val
    },
    setGraphPointLabel(state, {val, index}){
      Vue.set(state.graphPointLabel, index, val)
    },
    deleteData(state, index) {
      Vue.delete(state.topic, index)
      Vue.delete(state.chips, index)
      Vue.delete(state.graphPointLabel, index)
    }
  },
  actions: {
  },
  getters: {
    getShowDate: state => state.showDate,
    getMonth: state => state.month,
    getChips: state => state.chips,
    getGraphPointLabel: state => state.graphPointLabel
  },
  modules: {
  }
})
