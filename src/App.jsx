import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './routes/home';
import Shop from './routes/shop/shop.route';
import Auth from './routes/auth/auth.route';
import Navigation from './components/navigation/navigation.component';
import Checkout from './routes/checkout/checkout.route';
import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCategoriesAndDocuments
} from './lib/utils/firebase.utils';
import { setUser } from './lib/store/user/user.action';
import { setCategories } from './lib/store/categories/categories.action';
import './app.styles.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
      dispatch(setUser(user))
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    const getCategories = async () => {
       const categories = await getCategoriesAndDocuments()
       dispatch(setCategories(categories))
    }
    getCategories()
 }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Auth />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='shop/*' element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
