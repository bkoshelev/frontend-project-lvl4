import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import router from './router';
import { AuthProvider } from './contexts';
import store from './slices';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
);

export default App;
