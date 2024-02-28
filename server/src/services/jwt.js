import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../keys.js';

const {sign, verify} = jwt;

/**
 *  Genera un token de autentificación
 *
 * @param {Payload} payload Información que se intercambiara en el token
 * @returns {string} Resultado de la generación del Token
 */
export const generateToken = payload =>
	sign(payload, JWT_SECRET, {
		expiresIn: '1d',
	});

/**
 * Valida si el token generaro con las llaves de generacion es correcto.
 *
 * @param {string} token Llave de autentificación
 * @returns {Payload} Resultado de la verificación de token
 */
export const validateToken = token => verify(token, JWT_SECRET);

/**
 * @typedef Payload Objeto de intercambio de datos
 * @property {number} id Identificador unico de la función
 */
