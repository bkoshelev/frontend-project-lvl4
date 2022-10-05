import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';

import router from "./router"
import { AuthProvider } from './contexts';
import store from './slices'

function App() {
  return <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
}

export default App;
