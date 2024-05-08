const path = require('path');

module.exports = {
	entry: './src/indexAbuelo.ts',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{loader: "css-loader"},
					{loader: "postcss-loader"},
				],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpeg|gif|jpg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: './src/asset',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
