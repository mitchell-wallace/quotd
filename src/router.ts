import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from './Layout.vue';
import HomePage from './pages/Home.page.vue';
import QuotesPage from './pages/Quotes.page.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: '/app',
        component: QuotesPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
