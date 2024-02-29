// Dependencias
// eslint-disable-next-line no-unused-vars
import {Request, Response} from 'express';
import {validatePass} from '../services/hash';
import {generateToken} from '../services/jwt';
import { createOne, searchOneBy } from '../services/auth';

/**
 *  Registra un usuario en la base de datos
 *
 * @param req Objeto Request de la libreria de express
 * @param res Objeto Response de la libreria de express
 */
export async function registerUser(req: Request, res: Response) {
	// Recupero el cuerpo de la petición HTTP
	const {name, username, password, email, birthday} = req.body;

	const resp = await createOne({name,birthday,email,password,username});

	res.json(resp);

}

/**
 *  Realiza un loign de usuario en la base de datos
 *
 * @param req Objeto Request de la libreria de express
 * @param res Objeto Response de la libreria de express
 */
export const loginUser = async (req: Request, res: Response) => {
	// Recuperar el usuario, email y contraseña del usuario
	const {username, email, password} = req.body;

	const user = await searchOneBy({ username, email });

	// Valido si existe el usuario
	if (!user) {
		return res.status(404).json({message: 'User not found!'});
	}

	// Valido si la contraseña es correcta
	const isValid = await validatePass(password, user.password);
	if (!isValid) {
		return res.status(403).json({message: 'The password is not valid!'});
	}

	// Generarión de JWT
	const token = generateToken({id: user.id});

	// Respuesta al Cliente
	return res.json({token});
};
