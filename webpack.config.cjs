const path = require('path');

module.exports = {
	mode: 'development', // or 'production'
	entry: './src/index.js', // your entry point
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'my-library.js',
		library: 'MyLibrary', // library name
		libraryTarget: 'umd', // universal module definition
		globalObject: 'this'
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src') // path alias setup
		},
		extensions: ['.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};

