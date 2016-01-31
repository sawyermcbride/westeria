const express = require('express');

const weather = express.Router();



weather.get('/', (req, res) => {
  res.send('You are asking for the weather');
});