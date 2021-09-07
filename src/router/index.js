import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/login',
    children: [{
      path: '/login',
      name: '登录',
      component: () => import('@/views/login/index')
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    children: [{
      path: '/Home',
      name: '主页',
      component: () => import('@/views/Home/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/table',
        name: '学生答题情况',
        component: () => import('@/views/table/index'),
        meta: { title: '学生答题情况', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
