'use strict';
const https = require('https');

module.exports.get = function (url) {
  let out = "";
  return new Promise( (resolve, reject) => {
    let req = https.get(url, (res) => {
      res.on('data', (chunk) => {
        out+=chunk.toString();
      });
      res.on('end', () => {
        resolve(out);
      });
    });
    req.end();
  });
}
