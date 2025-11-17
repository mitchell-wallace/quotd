import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MobileLayout from './layouts/MobileLayout.vue';
import WebLayout from './layouts/WebLayout.vue';
import HomePage from './pages/Home.page.vue';
import LibraryPage from './pages/Library.page.vue';
import QuotesPage from './pages/Quotes.page.vue';
import { isNativeApp } from './utils/platform';

// Determine which layout to use based on platform
const RootLayout = isNativeApp() ? MobileLayout : WebLayout;

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: RootLayout,
    redirect: isNativeApp() ? '/app' : '/',
    children: isNativeApp()
      ? [
          // Native app routes (no home page)
          {
            path: '/app',
            component: QuotesPage,
          },
          {
            path: '/library',
            component: LibraryPage,
          },
        ]
      : [
          // Web routes (includes home page)
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
