import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import PerfilUsuario from './pages/PerfilUsuario';
import { getToken } from './services/localStorage';

function App() {
  const { isAuth } = useAuth();
  if (!isAuth)
    return;

  const token:string | null = getToken()
  console.log(token)

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main >
        <Routes>
          <Route index element={
            <ProtectedRoutes restrict={!isAuth} redirectTo='/login'>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path='user' element={
            <ProtectedRoutes restrict={ !isAuth } redirectTo='/login'>
              <PerfilUsuario idUser={1}/>
            </ProtectedRoutes>
          } />

          <Route element={<ProtectedRoutes restrict={isAuth} redirectTo='/' />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='*' element={<h1>Not Found!!!!</h1>} />

        </Routes>
      </main>
      <footer className="footer mt-auto py-3 bg-dark">
        <div className="container text-center">
          <span className="text-muted">© 2024 BoostWash</span>
        </div>
      </footer>
    </>
  )
}


export default App;