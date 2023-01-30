import { Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import Store from './routes/store';
import SingIn from './routes/sign-in';
import Navigation from './components/navigation/navigation.component';
import './app.styles.scss'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='store' element={<Store />} />
          <Route path='sign-in' element={<SingIn />} />
        </Route>
      </Routes>
  );
}

export default App;
