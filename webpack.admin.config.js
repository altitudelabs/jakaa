const ExtractTextPlugin = require('extract-text-webpack-plugin');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    `${__dirname}/globals`,
    `${__dirname}/admin/main.js`,
  ],
  output: {
    path: `${__dirname}/admin/dist`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        // loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        loader: ExtractTextPlugin.extract(
          'style', // backup loader when not building .css file
          !prod ? 'css?sourceMap!sass?sourceMap!autoprefixer-loader'  // loaders to preprocess CSS
                : 'css!sass!autoprefixer-loader'
        ),
      },
      {
        test: /([\w\-\/]+\.(?:eot|woff|ttf|otf|ico|jpeg|png|jpg|svg))/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },
  devServer: {
    contentBase: `${__dirname}/admin`,
    output: { filename: 'bundle.js' },
  },
  devtool: !prod ? 'source-map' : null,
  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
};
