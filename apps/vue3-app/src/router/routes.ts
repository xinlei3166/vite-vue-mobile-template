import type { RouteRecordRaw } from 'vue-router'

const RouterLayout = () => import('@/components/layout/Router.vue')
const NavbarLayout = () => import('@/components/layout/Navbar.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'homeHidden',
    meta: {
      title: '首页',
      icon: 'icon-reloadtime'
    },
    component: RouterLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/home/home.vue')
      }
    ]
  },
  {
    path: '/news',
    name: 'newsHidden',
    meta: {
      title: '资讯',
      icon: 'icon-reloadtime'
    },
    component: NavbarLayout,
    children: [
      {
        path: '/news',
        name: 'news',
        meta: {
          title: '资讯',
          showLeftArrow: false
        },
        component: () => import('@/views/news/index.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'messageHidden',
    meta: {
      title: '消息',
      icon: 'icon-reloadtime'
    },
    component: NavbarLayout,
    children: [
      {
        path: '/message',
        name: 'message',
        meta: {
          title: '消息',
          showLeftArrow: false
        },
        component: () => import('@/views/message/index.vue')
      }
    ]
  },
  {
    path: '/my',
    name: 'myHidden',
    meta: {
      title: '我的',
      icon: 'icon-reloadtime'
    },
    component: RouterLayout,
    children: [
      {
        path: '/my',
        name: 'my',
        meta: {
          title: '我的',
          auth: true
        },
        component: () => import('@/views/my/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      title: 'components',
      icon: 'icon-reloadtime'
    },
    component: NavbarLayout,
    children: [
      {
        path: '/components/router',
        name: 'router',
        meta: {
          title: 'router',
          icon: 'icon-unorderedlist'
        },
        component: () => import('features/components/router/index.vue')
      },
      {
        path: '/components/store',
        name: 'store',
        meta: {
          title: 'store',
          icon: 'icon-unorderedlist',
          auth: true
        },
        component: () => import('features/components/store/index.vue')
      },
      {
        path: '/components/bus',
        name: 'bus',
        meta: {
          title: 'bus',
          icon: 'icon-user'
        },
        component: () => import('features/components/bus/index.vue')
      },
      {
        path: '/components/provide-inject',
        name: 'provide-inject',
        meta: {
          title: 'provide',
          icon: 'icon-appstoreadd'
        },
        component: () => import('features/components/provide/index.vue')
      },
      {
        path: '/components/table',
        name: 'table',
        meta: {
          title: 'table',
          icon: 'icon-appstore'
        },
        component: () => import('features/components/table/index.vue')
      },
      {
        path: '/components/draggable',
        name: 'draggable',
        meta: {
          title: 'draggable',
          icon: 'icon-setting'
        },
        component: () => import('features/components/draggable/index.vue')
      }
    ]
  }
]

export default routes
