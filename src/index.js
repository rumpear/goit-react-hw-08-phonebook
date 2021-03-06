import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';

import 'modern-normalize/modern-normalize.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={'Loading'} persistor={persistor}>
      <BrowserRouter basename="goit-react-hw-08-phonebook">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  //</React.StrictMode>
);
