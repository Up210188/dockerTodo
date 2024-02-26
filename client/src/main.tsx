// Dependencias
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

// Componentes
import App from './App';

// Bootstrap
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

// Styles
import './css/index.css';

// Punto de Entrada
const app = document.getElementById('root')!;
const root = ReactDOM.createRoot(app);

// Renderizado de aplicación
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);