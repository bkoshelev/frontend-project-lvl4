import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary as RollbarErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';

import router from './router';
import store from './slices';
import i18nInstance from './locales';
import { socketInstance, SocketProvider } from './utils/socket';

const rollbarConfig = {
  enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: process.env.NODE_ENV,
  server: {
    branch: 'main',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <RollbarErrorBoundary>
      <ReduxProvider store={store}>
        <I18nextProvider i18n={i18nInstance}>
          <SocketProvider socket={socketInstance}>
            <RouterProvider router={router} />
          </SocketProvider>
        </I18nextProvider>
        <ToastContainer />
      </ReduxProvider>
    </RollbarErrorBoundary>
  </RollbarProvider>
);

export default App;
