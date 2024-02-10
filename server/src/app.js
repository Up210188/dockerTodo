// Dependencias
import express from 'express';

// Routas de la aplicacin
import mainRoutes from './routes/routes.js';
import apiRoutes from './routes/api.routes.js';

// Instancia del objeto de express
const app = express();

// Middleware
app.use(express.json()); // Enternder JSON -> application/json
app.use(express.urlencoded({ extended: false })); // Enterder form-urlencode -> application/form-urlencode

// Rutas de mi aplicación
app.use(mainRoutes);
app.use('/api', apiRoutes);

export default app;
