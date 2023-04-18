import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import App from './App'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './lib/utils/stripe.utils'
import { CartProvider } from './lib/contexts/cart.context'
import { CategoriesProvider } from './lib/contexts/categories.context'
import { UserProvider } from './lib/contexts/user.context'

// import { store, persistor } from './lib/store/store'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'

import './index.scss'

const client = new ApolloClient({
   uri: 'https://crwn-clothing.com/',
   cache: new InMemoryCache(),
})

const rootElement = document.getElementById('root')

render(
   <React.StrictMode>
      <ApolloProvider client={client}>
         <CartProvider>
            <CategoriesProvider>
               <UserProvider>
                  {/* <Provider store={store}>
                  <PersistGate loading={null} persistor={persistor}> */}
                  <BrowserRouter>
                     <Elements stripe={stripePromise}>
                        <App />
                     </Elements>
                  </BrowserRouter>
                  {/* </PersistGate>
                  </Provider> */}
               </UserProvider>
            </CategoriesProvider>
         </CartProvider>
      </ApolloProvider>
   </React.StrictMode>,
   rootElement
)
