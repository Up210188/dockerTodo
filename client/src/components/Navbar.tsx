import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('tokenApp');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">ToDo APP</a>
        <button name='toggle'
          className="navbar-toggler collapsed"
          type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            {
              isAuth && (
                <>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link" >Inicio
                      <span className="visually-hidden">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ cursor: "pointer" }} onClick={logout}>
                    <span className="nav-link">Logout</span>
                  </li>
                </>
              )
            }
            {
              !isAuth && (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Registro</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>
              )
            }
          </ul>
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Buscar tarea" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar