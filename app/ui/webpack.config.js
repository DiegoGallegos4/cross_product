const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV == 'production';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    },
  }),
  new webpack.NamedModulesPlugin()
];

if (!IS_PRODUCTION) {
  // Development plugins
  plugins.push(
    // Don't emmit build when there was an error while compiling
    // No assets are emitted that include errors
    new webpack.NoEmitOnErrorsPlugin(),
    // Webpack dashboard plugin
    new DashboardPlugin()
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_debugger: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    })
  )
}

// Webpack config
module.exports = {
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  watch: !IS_PRODUCTION,
  entry: {
    'cross_product/app': path.join(__dirname, '/src/cross_product.js')
  },
  output: {
    path: path.join(__dirname, '../static/js/build'),
    filename: '[name].js',
  },
  module: {
    rules : [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.join(__dirname, './node_modules'),
      path.join(__dirname, './src'),
    ],
  },
  plugins,
};