const express = require('express');
const app = express();
const th = require('./th');
const path = require('path');
const db = require('./db');

const { Reading } = db.model;

// app.use(express.static(path.join(__dirname, 'src')))
// app.get('/th', (req, res, next) => {
//   led();
//   res.send('done')
// })
app.use('/', express.static(path.join(__dirname + '/dist')));
app.use('/dist', express.static(path.join(__dirname + '/node_modules')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

setInterval(() => {
  th();
}, 5000);

app.get('/reading', (req, res, next) => {
  Reading.findAll()
    .then(reading => {
      res.send(reading);
    })
    .catch(next);
});

module.exports = app;
