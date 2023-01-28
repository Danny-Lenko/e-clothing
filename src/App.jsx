import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import './app.styles.scss'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
  );
}

export default App;
