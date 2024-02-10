import mysql from 'mysql2';

// Errores comunes en la conexión en la Base de Datos!
const DB_ERRORS = {
  PROTOCOL_CONNECTION_LOST: 'DB connection is Lost!',
  ER_CON_COUNT_ERROR: 'A lot of DB Connections!',
  ECONNREFUSED: 'DB Connection is not available!',
  DEFAULT: (error) => console.error(error)
};

// Generando un conexion TCP/IP a la base de datos
const poolConnection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'dbTodoApp',
  user: 'devUser',
  password: '123456789'
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
