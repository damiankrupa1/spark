export const routes = [
  { path: '/', redirect: '/account-settings' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
        meta: {
          auth: false,
        },
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
        meta: {
          auth: false,
        },
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
        meta: {
          auth: false,
        },
      },
    ],
  },
]
