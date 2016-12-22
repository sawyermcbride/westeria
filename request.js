'use strict';
const https = require('https');

/**
 * A promise wrapper for the http 'get' method
 * The function returns a promise that invokes the http.get() method
 * The promise is resolved when the 'res' obj fires end event
 *
 * @param   {String}  url The url to pass into http.get()
 * @returns {Promise} A promise that resolves when the end event fires
 */
module.exports.get = function ( url ) {
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
