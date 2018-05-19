const conn = require('./conn');
const { Sequelize } = conn;

const Temp = conn.define('temp', {
  temp: {
    type: Sequelize.FLOAT
  },
  humidity: {
    type: Sequelize.FLOAT
  }
});
const sync = () => conn.sync();

module.exports = {
  Temp,
  sync
};
