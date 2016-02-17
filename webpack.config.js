const path = require('path');
const webpack = require('webpack');
module.exports = {
	context: __dirname,
	entry: './src/js/main.jsx',
	output: {
		path: 'dist/',
		filename: 'main.compiled.js'
	},
	resolve: {
		moduleDirectorys: ['node_modules', 'src'],
		extensions: ['','.js','.jsx']
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
