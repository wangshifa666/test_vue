import persistedState from 'vuex-persistedstate'
import { resetRouter } from '@/router'

const state = {
  menubarCollapse: false,//
  lastUpdateTime: 0,
  menubars: []
//
}
const mutations = {
  UPDATE_MENUBAR: (state,menubars) => {
    state.menubars = menubars;
    resetRouter(menubars);
    console.debug("UPDATE_MENUBAR:"+menubars);
  },
  RESET_MENUBAR: (state) => {
    resetRouter(state.menubars);
    console.debug("RESET_MENUBAR:"+state.menubars);
  },
  TOGGLE_MENUBAR: state => {
    state.menubarCollapse = false;
    console.debug("TOGGLE_MENUBAR:"+state.menubarCollapse);
  },
  CLOSE_MENUBAR: (state) => {
    state.menubarCollapse = true;
    console.debug("CLOSE_MENUBAR:"+state.menubarCollapse);
  }
}
const actions = {
  updateMenuBar({commit},menubars){
    commit('UPDATE_MENUBAR',menubars)
  },
  resetMenuBar({commit}){
    commit('RESET_MENUBAR')
  },
  toggleMenuBar({commit}) {
    commit('TOGGLE_MENUBAR')
  },
  closeMenuBar({commit}) {
    commit('CLOSE_MENUBAR')
  }
}
const getters = {
  menubarCollapse: state => state.menubarCollapse,
  menubars: state => state.menubars
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  plugins: [persistedState()]
}
