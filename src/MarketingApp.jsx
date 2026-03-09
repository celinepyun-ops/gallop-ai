import { useState } from 'react';
import './App.css';
import './stories/tokens.css';
import './stories/fonts.css';
import { LandingPage } from './stories/LandingPage';
import { PricingPage } from './stories/PricingPage';
import { ProductPage } from './stories/ProductPage';

const APP_URL = 'http://localhost:5174';

function MarketingApp() {
  const [page, setPage] = useState('landing');

  const goToSignIn = () => { window.location.href = `${APP_URL}/login`; };
  const goToSignUp = () => { window.location.href = `${APP_URL}/signup`; };

  if (page === 'product') {
    return (
      <ProductPage
        onNavigate={setPage}
        onSignIn={goToSignIn}
        onGetStarted={goToSignUp}
      />
    );
  }

  if (page === 'pricing') {
    return (
      <PricingPage
        onNavigate={setPage}
        onSignIn={goToSignIn}
        onGetStarted={goToSignUp}
      />
    );
  }

  return (
    <LandingPage
      onNavigate={setPage}
      onSignIn={goToSignIn}
      onGetStarted={goToSignUp}
    />
  );
}

export default MarketingApp;
