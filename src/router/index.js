import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'
import store from '@/store'
export const constantRoutes = [
    {
      path: '/login',
      name: 'login',
      iconName: 'el-icon-location',
      tag: 'login',
      component: () => import('@/views/login/index'),
    }
  ]
var self = this;
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
// 实现“懒加载组件”的通用函数
function view(comp) {
  if(comp=='layout'){
    //return Layout
    return () => import(`@/layout`)
  }else if(comp.startsWith('layout') ){
    return () => import(`@/layout/components/AppMain`)
  }else{
    return () => import(`@/views/${comp}`)

  }
}
function toRouter(menuBars){
  var routeres = [];
  if(menuBars){
  menuBars.forEach(m=>{
    const compentName = m.componet;
    const r = {
      path: m.path,
      name: m.name,
      iconName: m.iconName,
      tag: m.tag,
      component: view(m.component),
      redirect: m.redirect,
      children: toRouter(m.children)
    };
    routeres.push(r);
  });
  }
  return routeres;
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(menuBars) {
  var routeres = toRouter(menuBars);
  const newRouter = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: routeres
  })
  router.matcher = newRouter.matcher // reset router
  router.options.routes= newRouter.options.routes;
  console.debug("router.matcher:"+router.options.routes);

}

export default router
