import { createPool } from 'mysql2';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './keys.js';

// Errores comunes en la conexión en la Base de Datos!
const DB_ERRORS = {
  PROTOCOL_CONNECTION_LOST: 'DB connection is Lost!',
  ER_CON_COUNT_ERROR: 'A lot of DB Connections!',
  ECONNREFUSED: 'DB Connection is not available!',
  DEFAULT: (error) => console.error(error)
};

// Generando un conexion TCP/IP a la base de datos
const poolConnection = createPool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS
});

poolConnection.getConnection((error, connection) => {
  if (error) {
    // Mamejo de los posibles errores de conexion a la base de datos
    DB_ERRORS[error.code]
      ? console.error(DB_ERRORS[error.code])
      : DB_ERRORS.DEFAULT(error);

    // Salgo de la función si existe un error que ya mostre en consola
    return;
  }

  if (connection) { console.log('>> DB is connected!'); }
});

export default poolConnection.promise();
