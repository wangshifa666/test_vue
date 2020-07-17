import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'
import store from '@/store'
const constantRoutes = [
    {
      path: '/login',
      name: 'login',
      iconName: 'el-icon-location',
      tag: 'login',
      meta: {tag: 'login'},
      component: () => import('@/views/login/index'),
    } ,
    {
      path: '/layout',
      name: 'layout',
      iconName: 'el-icon-location',
      tag: 'layout',
      meta: {tag: 'layout'},
      component: Layout,
      redirect: '/dashboard',
      children: [{
          path: '/dashboard',
          name: 'Dashboard',
          iconName: 'el-icon-location',
          tag: 'menu',
          meta: {tag: 'menu'},
          component: () => import('@/views/dashboard/index'),
        }]
    }
  ]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  fixed: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
console.debug("router init")
console.debug(router)
// 实现“懒加载组件”的通用函数
function view(comp) {
  if(comp=='layout'){
    //return Layout
    return (resolve) => require([`@/layout`], resolve)
    //return () => import(`@/layout`)
  }else if(comp.startsWith('menus') ){
    return (resolve) => require([`@/views/index`], resolve)
    //return () => import(`@/layout/components/AppMain`)
  }else{
    return (resolve) => require([`@/views/${comp}`], resolve)
//    return () => import(`@/views/${comp}`)

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
      meta: {tag: m.tag},
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
  console.debug("router");
  console.debug(router);
  router.matcher = newRouter.matcher // reset router
  router.options.routes= newRouter.options.routes;
  router.options.fixed = true;
}

export default router
