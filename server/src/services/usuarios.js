// Dependencias
import conn from '../db.js';

/**
 * @typedef User Modelo de la base de datods para la respresentacion
 * @property {number} id identificador unico del usuario 
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {string} birthday
 * @property {boolean} active
 * @property {Date} createdDate
 * @property {Date} updatedDate
 */

/**
 * Op
 * @returns {User[]}
 */
export function getUsers () {
  const SQL `
    
  `;

  conn.
}

/**
 * Busca un usuario en la base de datos por identificador unico
 *
 * @param {number | string} id identificador del usuario
 * @returns {User}
 */
export function getOneUser (id) {

}
