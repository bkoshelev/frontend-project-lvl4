import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';

import App from './App';

import './utils/i18n';
import 'react-toastify/dist/ReactToastify.css';

const rollbarConfig = {
  enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'production',
  server: {
    branch: 'main',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
