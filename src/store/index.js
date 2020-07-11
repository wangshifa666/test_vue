import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user'
import menubar from './modules/menubar'
import getters from './getters'
import persistedState from 'vuex-persistedstate'


const store = new Vuex.Store({
  modules: {
   user: user,
   menubar: menubar
  },
  getters,
  plugins: [persistedState({paths:['menubar','user']})]

})

export default store
