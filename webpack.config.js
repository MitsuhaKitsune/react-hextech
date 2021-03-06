const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    }
  },

  entry: [
    './src/index.js'
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    library: 'reactHextech',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: 'hextech-[local]-[hash:base64:5]',
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins () {
                  return [
                    require('autoprefixer'), // eslint-disable-line
                    require('postcss-input-style') // eslint-disable-line
                  ];
                }
              }
            },
            { loader: 'sass-loader' }
          ]
        })
      },

      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-otf' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'svg-url-loader' },
      { test: /\.png$/, loader: 'url-loader' },
      { test: /\.jpg$/, loader: 'url-loader' },
      { test: /\.webm/, loader: 'file-loader' },
      { test: /\.ogg/, loader: 'file-loader' }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Minify without warning messages and IE8 support
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      sourceMap: 'source-map'

    }),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true })
  ],

  target: 'web'
};
