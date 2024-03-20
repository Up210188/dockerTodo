// Dependencias
import { Router } from 'express';

// Middleware
import { authToken } from '../middlewares/bearerToken';
import { validateSchema } from '../middlewares/validateSchema';

// Controladores
import { loginUser, registerUser, validarToken } from '../controller/auth.controller';
import {
	createTask,
	deleteTask,
	getAllTasks,
	updateTask, getOneTask
} from '../controller/task.controller';

// Schemas
import { UserLoginSchema, UserRegisterSchema } from '../schemas/UserSchema';

// Instancia del Modulo Router
const router = Router();

// Auth routes
router.post('/register', validateSchema(UserRegisterSchema), registerUser);
router.post('/login', validateSchema(UserLoginSchema), loginUser);
router.post('/auth', authToken, validarToken);

// Tasks routes
router.route('/task')
	.get(authToken)
	.patch(authToken, updateTask);
router.route('/tasks/:id')
	.all(authToken)
	.get(getOneTask);
router.route('/tasks')
	.all(authToken)
	.get(getAllTasks);


// Exportación del Modulo
export default router;
