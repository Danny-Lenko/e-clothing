import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './lib/store/store';
import { CartContextProvider } from './lib/contexts/cart.context';
import './index.scss';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
