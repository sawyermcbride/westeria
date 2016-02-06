// Westeria by Sawyer McBrdie

'use strict';


const express = require('express');

const app = express();
const http = require('http');


let num = 0;

app.use( (req, res, next) => {
  console.log(req.url + '\n' + 'Connections: ' + ++num);
  next();
});

app.use('/w', weather);


app.use(express.static('public'));

app.listen(80, '0.0.0.0');

