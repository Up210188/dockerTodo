import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
//<FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />


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
        <a className="navbar-brand" href="#">ToDo App</a>
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
                    <NavLink to="/" className="nav-link" style={{ cursor: "pointer" }} >Inicio
                      <span className="visually-hidden">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ cursor: "pointer" }} onClick={logout}>
                    <span className="nav-link"><FontAwesomeIcon icon={faRightFromBracket} /> Logout </span>
                  </li>
                  <li className="nav-item" style={{ cursor: "pointer" }} >
                    <NavLink to='/user' className='nav-link'>User
                      <span className="visually-hidden">(current)</span>
                    </NavLink>
                  </li>
                </>
              )
            }
            {
              !isAuth && (
                <>
                  {/* <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Registro</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li> */}
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link dropdown-toggle" 
                      data-bs-toggle="dropdown" href="#" 
                      role="button" aria-haspopup="true" 
                      aria-expanded="true">
                        User <FontAwesomeIcon icon={faUser} />
                    </a>
                    <div className="dropdown-menu " data-bs-popper="static">
                      <NavLink to="/login" className="nav-link">Login <FontAwesomeIcon icon={faRightToBracket} /></NavLink>
                      <NavLink to="/register" className="nav-link">Registro <FontAwesomeIcon icon={faPenToSquare} /></NavLink>
                    </div>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar