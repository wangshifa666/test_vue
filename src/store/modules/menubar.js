import persistedState from 'vuex-persistedstate'
import { resetRouter } from '@/router'

const state = {

//
}
const mutations = {
}
const actions = {
}
const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  plugins: [persistedState()]
}
