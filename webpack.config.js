const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
    resolve: { // These options change how modules are resolved
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], // Automatically resolve certain extensions
    alias: { // Create aliases
      images: path.resolve(__dirname, 'src/assets/img'),  // src/assets/images alias
      sounds: path.resolve(__dirname, 'src/assets/sounds')
    }
},
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options:{
          presets: ['babel-preset-env']
        }
      }
    },
    {
      test: /\.scss$/,
      include: __dirname,
      exclude: /node_modules/,
      use: ExtractTextWebpackPlugin.extract({
        use: ['css-loader', 'sass-loader'],
        fallback: 'style-loader'
      }) //END EXTRACT
    }, //END SCSS
    {
        test: /\.(jpeg|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/img/&name=img/[path][name].[ext]', {  // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
    },
    {
      test:  /\.(ogg|mp3|wav|mpe?g)$/i,
      loader : 'file-loader?context=src/assets/sounds/&name=sounds/[path][name].[ext]',
      exclude: /node_modules/,
      include: __dirname
    }
  ], // END RULES
  }, // END MODULE
  plugins:[
    new ExtractTextWebpackPlugin('styles.css'),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open: true
  },
  devtool: 'eval-source-map',
} //END CONFIG

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCSSAssets(),
  );
}
