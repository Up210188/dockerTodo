// Dependencias
import pkg from 'bcryptjs';
const { compare, genSalt, hash } = pkg;

/**
 * Genera un Hash de un texto aleatorio
 *
 * @param {string} password Contraseña a encriptar
 * @returns {Promise<string>}
 */
export async function encryptPass (password) {
  // Se genera la llave para encriptar mi texto
  const salt = await genSalt(10);

  // Genero el hash de la contraseña
  return await hash(password, salt);
}

/**
 * Valida si los textos son iguales
 *
 * @param {string} password Texto sin hashear
 * @param {string} hash Texto con hash
 * @returns {Promise<boolean>} Estatus si los textos coinciden
 */
export async function validatePass (password, hash) {
  return await compare(password, hash);
}
