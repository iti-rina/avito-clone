import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppWithProviders } from './App.tsx';
import './app/translations/i18n.js';
import '@ant-design/v5-patch-for-react-19';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>
);
