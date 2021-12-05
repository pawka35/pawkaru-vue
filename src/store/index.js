import Vue from 'vue'
import Vuex from 'vuex'
import radio from './modules/radio'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    radio
  }
})
