// Westeria by Sawyer McBrdie

'use strict';

const express = require('express');

const app = express();

const weather = require('./weather');

const request = require('./request');

let num = 0;

app.use( (req, res, next) => {
  console.log(req.url + '\n' + 'Connections: ' + ++num);
  next();
});


app.use('/w', weather);

app.get('/l', (req, res) => {
  let longitude = req.query.long;
  let latitude = req.query.lat;

  if(!longitude || !latitude) {
    res.status(400);
    res.json({error: 'Location parameters missing!'});
  }
  console.log('in');
  request.get('https://www.geocode.farm/v3/json/reverse/?lat=' + latitude + '&lon=' + longitude + '&country=us&lang=en').then( (data) => {
    let info = JSON.parse(data);
    res.json({
      addr: info.geocoding_results.RESULTS[1].formatted_address
    });
  });
});


app.use(express.static('public'));

app.listen(80, '0.0.0.0');
