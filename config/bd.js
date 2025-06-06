require('dotenv').config();
const mysql = require('mysql2');

var connection;

connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

connection.connect((err) => {
    if (err) {
      console.error('Error de conexión:', {
        code: err.code,
        errno: err.errno
      });
      return;
    }
    console.log('Estas conectado');
  });

module.exports = connection;
