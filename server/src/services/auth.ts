import { RowDataPacket } from 'mysql2';
import conn from '../db';

/**
 * Obtiene un solo usuario de la base de datos.
 *
 * @param  userSearch Identificador unico
 * @returns Usuario extraido de la base de datos
 */
export const searchOne = async ({ email, username }: UserSearch) => {
	// Crear la sentencia SQL
	const SQL = `
    SELECT id, password FROM TR_USER WHERE username = ? OR email = ?;
  `;
	const [rows] = await conn.query<SqlUser>(SQL, [username, email]);
	const [user] = rows;
};

export type UserSearch = {
  username: string;
  email:string;
  password: string;
};

export type User = UserSearch & {
  id: string;
  name: string;
  birthday: string;
  createdDate: string;
  updatedDate: string;
  active: boolean;
};

type SqlUser = User[] & RowDataPacket;