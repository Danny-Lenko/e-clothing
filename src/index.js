import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './lib/store/store';
import { CategoriesContextProvider } from './lib/contexts/categories.context';
import { CartContextProvider } from './lib/contexts/cart.context';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CategoriesContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </CategoriesContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
