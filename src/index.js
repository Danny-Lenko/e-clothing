import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserContextProvider } from './lib/contexts/user.context';
import { CategoriesContextProvider } from './lib/contexts/categories.context';
import { CartContextProvider } from './lib/contexts/cart.context';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <CategoriesContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </CategoriesContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
