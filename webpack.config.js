/* jshint node: true */
/* jshint strict: false */

/* webpack.config.js
 *
 * Building the bootstrap files is straightforward and requires very little
 * configuration, as the default options do everything we need. The css and
 * js files are generated separately. Popper, which is used for tooltip and
 * popovers is imported into boostrap.js.
 *
 * The processing steps for scss files is in reverse order:
 *
 * 1. Load the scss file using sass-loader.
 * 2. Compile the scss to css.
 * 3. Post-process the css to add vendor prefixes.
 * 4. Treat @import / url() as import / require and resolve the references.
 * 5. Extract the css strings from the javascript.
 * 6. Since mode = production, minimise the css and write it the output.
 *
 * After step 5, there is no other javascript and webpack will write an empty
 * file to the output. The removeEmptyChunks option does not affect this, see
 * https://github.com/webpack/webpack/issues/11088. This is solved by adding
 * the RemoveEmptyScriptsPlugin which does what it says.
 *
 * The default configuration for the TerserPlugin will extract the copyright
 * headers from the bootstrap js files and write them to a separate text file.
 * That way you can save up to 6.5KB from every download.
 *
 * Links:
 *   https://webpack.js.org/plugins/copy-webpack-plugin/
 *   https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
 *   https://webpack.js.org/plugins/mini-css-extract-plugin/
 *   https://github.com/webdiscus/webpack-remove-empty-scripts
 *   https://webpack.js.org/plugins/terser-webpack-plugin/
 */

const autoprefixer = require('autoprefixer');
const path = require('path');

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
      "js/bootstrap.bundle.min": "./src/js/bootstrap.js",
      "css/bootstrap.bundle.min": "./src/scss/bootstrap.scss",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({}),
      new CssMinimizerPlugin({}),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new RemoveEmptyScriptsPlugin(),
  ]
};
