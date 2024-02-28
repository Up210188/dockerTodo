
//Dependencias
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

//Componentes
import App from './App';

// Estilos
import './css/index.css';
import 'bootswatch/dist/slate/bootstrap.min.css'

//Punto de entrada
const app = document.getElementById('root')!;
const root = ReactDOM.createRoot(app);


// Renderizado de la aplicación
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);