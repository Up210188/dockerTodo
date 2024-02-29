import { RowDataPacket } from 'mysql2';
import conn from '../db';
import { encryptPass } from './hash';

/**
 * Obtiene un solo usuario de la base de datos.
 *
 * @param  userSearch Identificador unico
 * @returns Usuario extraido de la base de datos
 */
export const searchOneBy = async ({ email, username }: UserSearch) => {
	// Crear la sentencia SQL
	const SQL = `
    SELECT id, password FROM TR_USER WHERE username = ? OR email = ?;
  `;
	const [rows] = await conn.query<UserSQL[]>(SQL, [username, email]);
	const [user] = rows;

	return user as  User;
};

export const createOne = async ({ birthday, email, name, password, username }: UserCreate) => {
	// Genero mi consulta SQL
	const SQL = `
      INSERT INTO TR_USER (name, username, password, email, birthday, createdDate)
        VALUES(?,?,?,?,?, NOW());
    `;

	// Encripto la contraseña del usuario
	const newPassword = await encryptPass(password);

	// Ejecuto la respuesta SQL
	const [resp] = await conn.execute(SQL, [name, username, newPassword, email, birthday]);

	return resp;
};

export interface UserSearch {
  username: string;
  email:string;
}

export interface UserCreate extends UserSearch {
  name: string;
  password: string;
  birthday:string;
}

export interface User extends UserSearch {
  id: string;
  password: string;
  name: string;
  birthday: string;
  createdDate: string;
  updatedDate: string;
  active: boolean;
}

export interface UserSQL extends User, RowDataPacket {}