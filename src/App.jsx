import { Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import Shop from './routes/shop/shop.route';
import Auth from './routes/auth/auth.route';
import Navigation from './components/navigation/navigation.component';
import Checkout from './routes/checkout/checkout.route';
import './app.styles.scss'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='auth' element={<Auth />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
  );
}

export default App;
