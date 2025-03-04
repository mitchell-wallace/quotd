import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { QuotesPage } from './pages/Quotes.page';
import { Layout } from './Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/quotes',
        element: <QuotesPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
