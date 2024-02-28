// Dependencias
import {Router} from 'express';

// Middleware
import {authToken} from '../middlewares/bearerToken.js';

// Controladores
import {loginUser, registerUser} from '../controller/auth.controller.js';
import {getAllTasks} from '../controller/task.controller.js';

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
