import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary as RollbarErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';

import { useTranslation } from 'react-i18next';
import router from './router';
import store from './slices';

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

const App = () => {
  const { ready } = useTranslation();

  if (ready) {
    return (
      <RollbarProvider config={rollbarConfig}>
        <RollbarErrorBoundary>
          <ReduxProvider store={store}>
            <RouterProvider router={router} />
            <ToastContainer />
          </ReduxProvider>
        </RollbarErrorBoundary>
      </RollbarProvider>
    );
  }
  return null;
};

export default App;
