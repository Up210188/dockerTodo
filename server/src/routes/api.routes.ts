// Dependencias
import { Router } from 'express';

// Middleware
import { authToken } from '../middlewares/bearerToken';
import { validateSchema } from '../middlewares/validateSchema';

// Controladores
import { loginUser, registerUser, validarToken } from '../controller/auth.controller';
import { getAllTasks } from '../controller/task.controller';

// Schemas
import {UserLoginSchema, UserRegisterSchema} from '../schemas/UserSchema';

// Instancia del Modulo Router
const router = Router();

// Auth routes
router.post('/register', validateSchema(UserRegisterSchema) ,registerUser);
router.post('/login', validateSchema(UserLoginSchema) ,loginUser);
router.post('/auth', authToken ,validarToken);

// Tasks Routes
router.route('/tasks')
	.get(authToken, getAllTasks);

// Exportación del Modulo
export default router;
