import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';

export default function PortfolioSite() {
  return (
    <>
      <Home />
      <Analytics />
    </>
  );
}
