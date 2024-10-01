export const routes = [
  { path: '/', redirect: '/account-settings' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'account-settings',
        name: 'settings',
        component: () => import('@/pages/account-settings.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('@/pages/calendar.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'calendar-events',
        name: 'calendarEvents',
        component: () => import('@/pages/calendarEvents.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'calendar-events-add',
        name: 'addCalendarEvents',
        component: () => import('@/pages/calendar/calendarEventsAdd.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'typography',
        name: 'typography',
        component: () => import('@/pages/typography.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'icons',
        name: 'icons',
        component: () => import('@/pages/icons.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'cards',
        name: 'cards',
        component: () => import('@/pages/cards.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'tables',
        name: 'tables',
        component: () => import('@/pages/tables.vue'),
        meta: {
          auth: true,
          redirect: '/login'
        },
      },
      {
        path: 'form-layouts',
        name: 'layouts',
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
        name: 'login',
        component: () => import('@/pages/login.vue'),
        meta: {
          auth: false,
        },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/register.vue'),
        meta: {
          auth: false,
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: () => import('@/pages/[...error].vue'),
        meta: {
        },
      },
    ],
  },
]
