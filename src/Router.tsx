import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/Home.page';
import { QuotesPage } from './pages/Quotes.page';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/app',
        element: <QuotesPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
