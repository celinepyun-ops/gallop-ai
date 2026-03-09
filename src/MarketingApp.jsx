import { useState, useEffect } from 'react';
import './App.css';
import './stories/tokens.css';
import './stories/fonts.css';
import { LandingPage } from './stories/LandingPage';
import { PricingPage } from './stories/PricingPage';
import { ProductPage } from './stories/ProductPage';

const APP_URL = 'http://localhost:5174';

function MarketingApp() {
  const [page, setPage] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '') || 'landing';
    return path;
  });

  const navigate = (p) => {
    setPage(p);
    window.history.pushState({}, '', p === 'landing' ? '/' : `/${p}`);
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'landing';
      setPage(path);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const goToSignIn = () => { window.location.href = `${APP_URL}/login`; };
  const goToSignUp = () => { window.location.href = `${APP_URL}/signup`; };

  if (page === 'product') {
    return (
      <ProductPage
        onNavigate={navigate}
        onSignIn={goToSignIn}
        onGetStarted={goToSignUp}
      />
    );
  }

  if (page === 'pricing') {
    return (
      <PricingPage
        onNavigate={navigate}
        onSignIn={goToSignIn}
        onGetStarted={goToSignUp}
      />
    );
  }

  return (
    <LandingPage
      onNavigate={navigate}
      onSignIn={goToSignIn}
      onGetStarted={goToSignUp}
    />
  );
}

export default MarketingApp;
