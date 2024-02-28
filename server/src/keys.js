// Configuracion de variables de confifuración del proyecto
import {config} from 'dotenv';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
config();

// Variables de Sistema
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const ENVS = [];
export const {NODE_ENV} = process.env;
export const PORT = Number(process.env.PORT) || 3000;

// Variables de base de datos
export const DB_NAME = process.env.DB_NAME || 'dbTodoApp';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT) || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASS = process.env.DB_PASS || '';

// Variables para el JWT
export const JWT_SECRET = process.env.JWT_SERCRET || 'This is a test!';
