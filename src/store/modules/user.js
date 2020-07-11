import persistedState from 'vuex-persistedstate'
import { resetRouter } from '@/router'
import Layout from '@/layout'
const routers = [{
      path: '/login',
      name: 'login',
      iconName: 'el-icon-location',
      tag: 'login',
      component: 'login/index',
    },
    {
      path: '/',
      name: 'layout',
      iconName: 'el-icon-location',
      tag: 'layout',
      component: 'layout',
      redirect: '/dashboard',
      children: [{
          path: '/dashboard',
          name: 'Dashboard',
          iconName: 'el-icon-location',
          tag: 'menu',
          component: 'dashboard/index',
        },
        {
          path: '/form',
          name: 'form',
          tag: 'menu',
          component: 'form/index',
          iconName: 'el-icon-location',
        },
        {
          path: '/example',
          name: 'example',
          iconName: 'el-icon-location',
          tag: 'menu',
          component: 'layout/components/AppMain',
          redirect: '/example/table',
          children: [{
              path: '/example/table',
              name: 'Table',
              component: 'table/index',
              tag: 'menu',
              iconName: 'el-icon-location'

            },
            {
              path: '/example/tree',
              name: 'Tree',
              component: 'tree/index',
              tag: 'menu',
              iconName: 'el-icon-location'
            }
          ]
        }
      ]
    }
  ]
const state = {
  username: '',
  token: '',
  lastLoginTime: 0,
  lastUpdateTime: 0,
  menubars: [], //菜单项
  menubarCollapse: false // 菜单展开状态：否
}
const mutations = {
  LOGIN: (state,userInfo) => {
    state.token = userInfo.token;
    state.username = userInfo.username;
    state.lastLoginTime = userInfo.lastLoginTime;
    state.lastUpdateTime = userInfo.lastUpdateTime;
    if(userInfo.menubars){
      state.menubars = userInfo.menubars;
      resetRouter(menubars);
    }
    state.menubars = routers;
    resetRouter(state.menubars);
    console.debug("LOGIN:"+state.menubars);
  },
  CLOSE_MENUBAR: (state) => {
    state.menubarCollapse = true;
    console.debug("CLOSE_MENUBAR:"+state.menubarCollapse);
  }
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    commit('LOGIN', userInfo)

  },
  logout({commit}) {
    commit('CLOSE_MENUBAR')
  }
}
const getters = {
  menubarCollapse: state => state.menubarCollapse
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  plugins: [persistedState()]
}
