// Westeria by Sawyer McBrdie

'use strict';
const express = require('express');

const app = express();

const weather = require('./weather');

const request = require('request.js');

let num = 0;

app.use( (req, res, next) => {
  console.log(req.url + '\n' + 'Connections: ' + ++num);
  next();
});

app.use('/w', weather);


app.get('/l', (req, res) => {
  let longitude = req.query.long;
  let latitude = req.query.lat;
  request.get('').then(function(city) {
    res.json({
      city: city,
      state: 
    });
  });  
});


app.use(express.static('public'));

app.listen(80, '0.0.0.0');

