const path = require('path');
const webpack = require('webpack');
module.exports = {
	context: __dirname,
	entry: './public/js/main.jsx',
	output: {
		path: 'public/',
		filename: 'main.compiled.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				query: {
					presets:['es2015', 'react']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.NoErrorsPlugin()
	]
}
