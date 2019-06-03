import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/pages/Login'
import Home from '../components/pages/Home'
import UserRegistration from '../components/pages/UserRegistration'
import NotFound from '../components/pages/NotFound'
import ShareList from '../components/templates/ShareList'
import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/user-registration',
      name: 'UserRegistration',
      component: UserRegistration
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/share-list',
      name: 'ShareList',
      component: ShareList
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/share-list' && to.query) {
    next()
  } else if (to.path === '/share-list') {
    next('/error')
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.user.auth) {
        next()
      } else {
        next('/')
      }
    } else if (store.state.user.auth) {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
