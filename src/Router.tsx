import { Route } from '@solidjs/router';
import { Layout } from './Layout';
import { HomePage } from './pages/Home.page';
import { QuotesPage } from './pages/Quotes.page';

export function AppRoutes() {
  return (
    <>
      <Route path="/" component={Layout}>
        <Route path="/" component={HomePage} />
        <Route path="/app" component={QuotesPage} />
      </Route>
    </>
  );
}
