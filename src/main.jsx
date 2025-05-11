import './index.css';
import App from './App.jsx';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import es from 'javascript-time-ago/locale/es-AR';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(es);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
