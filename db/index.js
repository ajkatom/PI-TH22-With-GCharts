const conn = require('./conn');
const { Sequelize } = conn;

const Reading = conn.define('reading', {
  degrees: Sequelize.FLOAT,
  precentage: Sequelize.FLOAT
});

const sync = () => {
  conn.sync({ force: true });
};

module.exports = {
  sync,
  model: {
    Reading
  }
};
