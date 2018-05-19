const app = require('./app');
const db = require('./db');
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listing on ${port}`);
});

db.sync();
