import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppWithProviders } from './App.tsx';
import './app/translations/i18n.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>
);
