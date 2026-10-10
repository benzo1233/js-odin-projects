import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'production',
    devtool: 'source-map', //comment out later bc we want to optimize js bundle sent to browser
    // .map file can expose your original source code. If you don't want users to be able to retrieve your source through the browser, you may choose a different production devtool
});
