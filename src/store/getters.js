const getters = {
  menubars: state => state.user.menubars.list,
  token: state => state.user.token,
  tablist: state => state.user.tabs.list,
  lastUpdateTime: state => state.user.lastUpdateTime,
  menubarCollapse: state => state.user.menubars.isCollapse,
  username: state => state.user.username,
}
export default getters
