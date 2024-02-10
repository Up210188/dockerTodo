// Dependencias
// eslint-disable-next-line no-unused-vars
import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import conn from '../db.js';
import { encryptPass, validatePass } from '../services/hash.js';

/**
 *  Registra un usuario en la base de datos
 *
 * @param {request} req Objeto Request de la libreria de express
 * @param {response} res Objeto Response de la libreria de express
 */
export async function registerUser (req, res) {
  try {
    // Recupero el cuerpo de la petición HTTP
    const { name, username, password, email, birthday } = req.body;

    // Genero mi consulta SQL
    const SQL = `
      INSERT INTO TR_USER (name, username, password, email, birthday, createdDate)
        VALUES(?,?,?,?,?, NOW());
    `;

    // Encripto la contraseña del usuario
    const newPassword = await encryptPass(password);

    // Ejecuto la respuesta SQL
    const [resp] = await conn.execute(SQL, [name, username, newPassword, email, birthday]);

    res.json(resp);
  } catch (error) {

  }
}

/**
 *  Realiza un loign de usuario en la base de datos
 *
 * @param {request} req Objeto Request de la libreria de express
 * @param {response} res Objeto Response de la libreria de express
 */
export const loginUser = async (req, res) => {
  // Recuperar el usuario, email y contraseña del usuario
  const { username, email, password } = req.body;

  // Crear la sentencia SQL
  const SQL = `
        SELECT id, password FROM TR_USER WHERE username = ? OR email = ?;
    `;
  const [rows] = await conn.query(SQL, [username, email]);
  const [user] = rows;

  // Valido si existe el usuario
  if (!user) { return res.status(404).json({ message: 'User not found!' }); }

  // Valido si la contraseña es correcta
  const isValid = await validatePass(password, user.password);
  if (!isValid) { return res.status(403).json({ message: 'The password is not valid!' }); }

  // Generarión de JWT
  const token = jwt.sign({ id: user.id }, 'this is my key!', {
    expiresIn: 60
  });

  // Respuesta al Cliente
  res.json({ token });
};
