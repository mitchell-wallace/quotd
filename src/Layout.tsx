import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-shrink-0">
        <Header />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
}
