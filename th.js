const sensor = require('node-dht-sensor');
const db = require('./db');
const { Reading } = db.model;

const readTemp = () => {
  sensor.read(22, 22, function(err, temperature, humidity) {
    if (!err) {
      console.log(
        `temp: ${temperature.toFixed(1)} °C, humidity: ${humidity.toFixed(1)} %`
      );
      Reading.create({
        degrees: temperature.toFixed(1),
        precentage: humidity.toFixed(1)
      });
    }
  });
};

module.exports = readTemp;
