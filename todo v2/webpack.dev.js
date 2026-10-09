import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    historyApiFallback: true, //Only needed for client side routing, via js
    compress: true, //is most beneficial when the browser needs to download large, compressible files from server
    open: true,
    hot: true, //webpack dev server does this by default, put this for clarify
    port: 8080,
  },
});
