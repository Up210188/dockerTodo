// Dependencias
import { Router } from 'express';

// Middleware
import { authToken } from '../middlewares/bearerToken.ts';

// Controladores
import { loginUser, registerUser } from '../controller/auth.controller.ts';
import { getAllTasks } from '../controller/task.controller.ts';

// Instancia del Modulo Router
const router = Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Tasks Routes
router.route('/tasks')
  .all(authToken)
  .get(getAllTasks);

// Exportación del Modulo
export default router;
