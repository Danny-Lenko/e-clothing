import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Spinner from './components/spinner/spinner.component'
import { checkIsUser } from './lib/store/user/user.action'
import { useDispatch } from 'react-redux'

import { GlobalStyle } from './global.styles'

const Home = lazy(() => import('./routes/home'))
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

   return (
      <Suspense fallback={<Spinner />}>
         <GlobalStyle/>
         <Routes>
            <Route path="/" element={<Navigation />}>
               <Route index element={<Home />} />
               <Route path="auth" element={<Auth />} />
               <Route path="checkout" element={<Checkout />} />
               <Route path="shop/*" element={<Shop />} />
            </Route>
         </Routes>
      </Suspense>
   )
}

export default App
