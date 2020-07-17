import persistedState from 'vuex-persistedstate'
import {resetRouter } from '@/router'
import  Router  from '@/router'
import { Message } from 'element-ui';
const state = {
  username: '',
  token: '',
  lastLoginTime: 0,
  lastUpdateTime: 0,
  menubars: [], //菜单项
  menubarCollapse: false ,// 菜单展开状态：否
  tabs: {//tab页显示，菜单点击历史记录
    maxLen: 10,//最大支持tab页数量，超过关闭第一项
    list: [],
  }
}
const mutations = {
  LOGIN: (state,userInfo) => {
    state.token = userInfo.token;
    state.username = userInfo.username;
    state.lastLoginTime = userInfo.lastLoginTime;
    state.lastUpdateTime = userInfo.lastUpdateTime;
    if(userInfo.menubars){
      state.menubars = userInfo.menubars;
    }
    resetRouter(state.menubars);
  },
  LOGOUT:(state)=> {
    state.token = '';
    state.username = '';
    state.lastLoginTime = 0;
    state.lastUpdateTime = 0;
    state.menubars = [];
    state.tabs.list = [];

  },
  HIDE_MENUBAR: (state) => {
    state.menubarCollapse = false;
  },
  OPEN_MENUBAR: state => {
    state.menubarCollapse = true;
  },
  ADD_TAB: (state, menubar)=> {
    var isContain = false;
    for(var i=0;i<state.tabs.list.length;i++){
      if(menubar.name==state.tabs.list[i].name){
        isContain = true;
      }
    }
    //tabs中不存在该菜单项，则新增
    if(!isContain){
      if(state.tabs.list.length==state.tabs.maxLen){
        state.tabs.list.shift();
      }
      state.tabs.list.push(menubar);
    }
  },
  REMOVE_TAB: (state, tabName)=> {
    let delPos = -1;
    state.tabs.list.forEach((tab, index) => {
      if (tab.name == tabName) {
        delPos = index;
      }
    })
    if(delPos==0 && state.tabs.list.length==1){
      Message.warning("至少保留一个tab页");
    }else if(delPos==-1){
      Message.warning("删除TAB页异常：" + tabName);
    }else{
      let delTab = state.tabs.list.splice(delPos,1);
      if(delTab[0].name==Router.currentRoute.path){
        if(delPos==state.tabs.list.length){
          Router.replace({path: state.tabs.list[delPos-1].name});
        }else{
          Router.replace({path: state.tabs.list[delPos].name});
        }
      }
    }
  }
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    commit('LOGIN', userInfo)
  },
  logout({commit}) {
    commit('LOGOUT')
  },
  openMenuBar({commit}) {
    commit('OPEN_MENUBAR')
  },
  hideMenuBar({commit}) {
    commit('HIDE_MENUBAR')
  },
  addTab({ commit }, menubar){
    commit('ADD_TAB', menubar)
  },
  removeTab({ commit }, tabName){
    commit('REMOVE_TAB', tabName)


  }
}
const getters = {
  menubarCollapse: state => state.menubarCollapse,
  username: state => state.username,
  token: state => state.token
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  plugins: [persistedState()]
}
