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

// app.get('/', (request, response) => {
//     response.send("Soy Rogelio");
// });

// app.get('/:name', (req, res) => {
//     const name = req.params.name; // Recuperar el valor de la URL
//     const type = req.query.type;

//     console.log({ name, type });

//     res.send("Enviado!!!");
// });

// app.get('/ping', (req, res) => {
//     res.status(200).send(req.headers);
// });

export default app;

