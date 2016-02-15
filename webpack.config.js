
'use strict';
const webpack = require('webpack');
let debug =  process.env.NODE_ENV !== 'production';


module.exports = {
  context: __dirname,
  entry: ['./public/js/main.js'],
  output: {
    path: __dirname + '/public/js',
    filename: 'main.compiled.js'
  },
  loaders: [
    {
      test: './public/js',
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      }
    }
  ]
}
