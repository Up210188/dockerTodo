import conn from '../db.js';

/**
 * Obtiene un solo usuario de la base de datos.
 *
 * @param {UserSearch} userSearch Identificador unico
 * @returns {User} Usuario extraido de la base de datos
 */
export const searchOne = async ({email, password, username}) => {
	// Crear la sentencia SQL
	const SQL = `
    SELECT id, password FROM TR_USER WHERE username = ? OR email = ?;
  `;
	const [rows] = await conn.query(SQL, [username, email]);
	const [user] = rows;
};

/**
 * @typedef UserSearch Parametros de busqueda para los datos
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef User Definicion de un usuario de la base de datos
 * @property {number} id
 * @property {strinng} name
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {Date} birthday
 * @property {Date} createdDate
 * @property {Date} updatedDate
 * @property {boolean} active
 */
