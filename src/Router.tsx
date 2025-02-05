import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { QuotesPage } from './pages/Quotes.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/app',
    element: <QuotesPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
