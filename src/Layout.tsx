import type { RouteSectionProps } from '@solidjs/router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export function Layout(props: RouteSectionProps) {
  return (
    <div class="min-h-screen flex flex-col">
      <div class="flex-shrink-0">
        <Header />
      </div>
      <main class="flex-1">
        {props.children}
      </main>
      <div class="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
}
