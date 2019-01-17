const withCSS = require('@zeit/next-css');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
/* eslint-enable import/no-extraneous-dependencies */

function recursiveIssuer(m) {
	if (m.issuer) {
		return recursiveIssuer(m.issuer);
	}
	if (m.name) {
		return m.name;
	}
	return false;
}

const nextConfig = withCSS({
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[local]',
	},
	webpack(config, { dev, buildId }) {
		config.performance = {
			hints: 'warning',
		};
		config.optimization = {
			...config.optimization,
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true,
				}),
				new OptimizeCssAssetsPlugin({}),
			],
			splitChunks: {
				cacheGroups: {
					styles: {
						name: 'styles',
						test: (m, c, e) => m.constructor.name === 'CssModule' && recursiveIssuer(m) === e,
						enforce: true,
					},
				},
			},
		};

		config.plugins = [
			...config.plugins,
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new webpack.DefinePlugin({ config: JSON.stringify({}) }),
		];

		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		});

		return config;
	},
});

module.exports = nextConfig;
