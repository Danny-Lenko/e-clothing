import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Spinner from './components/spinner/spinner.component'
import { checkIsUser } from './lib/store/user/user.action'
import { useDispatch } from 'react-redux'

import { Container } from './App.styles'
import { GlobalStyle } from './global.styles'

import { auth } from './lib/utils/firebase.utils'
import { cartService } from './lib/utils/cart.service'

const Home = lazy(() => import('./routes/home/home.route'))
const Shop = lazy(() => import('./routes/shop/shop.route'))
const Auth = lazy(() => import('./routes/auth/auth.route'))
const Navigation = lazy(
   () => import('./components/navigation/navigation.component')
)
const Checkout = lazy(() => import('./routes/checkout/checkout.route'))

function App() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(checkIsUser())
   }, [])

   useEffect(() => {
      const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
         if (auth.currentUser) {
            cartService.getCart(auth.currentUser.uid).then((cartItems) => {
               console.log('CART ITEMS:', cartItems)
            })
         }
      })

      return () => {
         unsubscribeFromAuth()
      }
   }, [])

   return (
      <Suspense fallback={<Spinner />}>
         <GlobalStyle />
         <Container>
            <Routes>
               <Route path="/" element={<Navigation />}>
                  <Route index element={<Home />} />
                  <Route path="auth" element={<Auth />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="shop/*" element={<Shop />} />
               </Route>
            </Routes>
         </Container>
      </Suspense>
   )
}

export default App
