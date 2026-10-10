import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default {
  entry: {
    app: './src/modules/index.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(import.meta.dirname,'..','dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Images: Copy image files to build folder
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs: Inline files
      {
        test: /\.(woff2?|woff?|ttf|otf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
};