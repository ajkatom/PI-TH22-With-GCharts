const Sequelize = require('sequelize');
const conn = new Sequelize({
  host: 'localhost',
  port: 5432,
  database: 'temp_db',
  username: 'pi',
  password: 'alon',
  dialect: 'postgres',
  logging: false
});

module.exports = conn;
