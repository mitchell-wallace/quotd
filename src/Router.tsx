import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { QuotesPage } from './pages/Quotes.page';
import { HeaderSimple } from './components/.MantineUI/HeaderSimple/HeaderSimple';
import { FooterCentered } from './components/.MantineUI/FooterCentered/FooterCentered';

const Layout = () => {
  return (
    <>
      <HeaderSimple />
      <Outlet />
      <FooterCentered />
    </>
  );
};

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
