const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_backend','root','ghostman',{
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;

// const mysql = require('mysql2');
// const pool = mysql.createPool({
//   host: 'localhost',
//   database: 'node_backend',
//   user: 'root',
//   password: 'ghostman',
// });

// module.exports = pool.promise(); 