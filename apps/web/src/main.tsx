import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './styles.css';

try {
  localStorage.removeItem('scms_theme');
  document.documentElement.removeAttribute('data-theme');
  document.body?.removeAttribute('data-theme');
} catch {
  // Ignore in environments without localStorage
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>,
);
