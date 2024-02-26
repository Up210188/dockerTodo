import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main className='container d-flex justify-content-center'>
        <Routes>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;