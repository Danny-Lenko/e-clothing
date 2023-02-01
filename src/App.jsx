import { Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import Store from './routes/store';
import Auth from './routes/auth/auth.route';
import Navigation from './components/navigation/navigation.component';
import './app.styles.scss'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='store' element={<Store />} />
          <Route path='auth' element={<Auth />} />
        </Route>
      </Routes>
  );
}

export default App;
