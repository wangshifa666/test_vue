import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = 'test'
  // determine whether the user has logged in
  const hasToken = store.getters.token
  console.debug("permission token")
  console.debug(hasToken)
  if (hasToken) {
    if (['/','/login'].indexOf(to.path)>=0) {
      // if is logged in, redirect to the home page
      next({ path: '/main' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    }else{
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach((to,from) => {
  // finish progress bar
  console.debug("router aftereach")
  console.debug(to)
  if("menu"===to.meta.tag){
    store.dispatch('user/addTab',{name: to.path,title: to.name})
  }
  NProgress.done()
})
