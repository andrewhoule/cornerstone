
const apply = require('postcss-apply');
const browserSync = require('browser-sync-webpack-plugin');
const colorFunction = require('postcss-color-function');
const cssImport = require('postcss-import');
const cssNano = require('cssnano');
const cssNext = require('postcss-cssnext');
const extractTextPlugin = require('extract-text-webpack-plugin');
const fontMagician = require('postcss-font-magician');
const nested = require('postcss-nested');
const path = require('path');
const pxToRem = require('postcss-pxtorem');
const styleLint = require('stylelint');
const svgSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  devtool: 'eval-source-map',

  entry: [
    path.join(__dirname, 'source/app.js')
  ],

  output: {
    path: path.join(__dirname, '/build/'),
    publicPath: './',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader',
        options: {
          name: 'img/[hash].[ext]',
        },
      },

      {
        test: /\.svg$/,
        exclude: /(node_modules)/,
        use: [
          'file-loader'
        ]
      },

      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },

      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader', options: {
                sourceMap: 'inline',
                plugins: () => [
                  cssImport(),
                  styleLint,
                  apply,
                  nested,
                  pxToRem({
                    replace: false
                  }),
                  colorFunction(),
                  fontMagician({
                    variants: {
                      'Lato': {
                        '300': [],
                        '300 italic': [],
                        '400': [],
                        '400 italic': [],
                        '700': [],
                        '700 italic': [],
                        '900': []
                      },
                      'Lora': {
                        '400': [],
                        '400 italic': [],
                        '700': [],
                        '700 italic': []
                      }
                    },
                    foundries: ['google']
                  }),
                  cssNext({
                    browsers: ['last 2 versions']
                  }),
                  cssNano({
                    autoprefixer: false
                  })
                ]
              }
            },
          ]
        })
      },
      
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader', options: {
              presets: [
                'es2015'
              ],
              sourceMaps: 'inline'
            }
          },
          {
            loader: 'eslint-loader', options: {
              configFile: './.eslintrc'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new extractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),

    new browserSync({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localdomain.local',
      notify: false
    }),

    new svgSpritemapPlugin({
      filename: 'icons.svg',
      prefix: '',
      src: './source/icons/**/*.svg'
    })
  ]
}
