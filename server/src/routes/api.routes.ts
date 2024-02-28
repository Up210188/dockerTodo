// Dependencias
import {Router} from 'express';

// Middleware
import { authToken } from '../middlewares/bearerToken';

// Controladores
import { loginUser, registerUser } from '../controller/auth.controller';
import { getAllTasks } from '../controller/task.controller';

// Instancia del Modulo Router
// eslint-disable-next-line new-cap
const router = Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Tasks Routes
router.route('/tasks')
	.get(authToken, getAllTasks);

// Exportación del Modulo
export default router;
