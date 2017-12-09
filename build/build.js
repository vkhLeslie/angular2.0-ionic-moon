// https://github.com/shelljs/shelljs
require('./check-versions')();
require('shelljs/global');
env.NODE_ENV = 'production';

var path = require('path');
var buildConfig = require('../config/buildConfig');//打包配置
var ora = require('ora');
var webpackConfig = require('./webpack.config.js');


console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...');
spinner.start();

var assetsPath = path.join(buildConfig.build.assetsRoot, buildConfig.build.assetsSubDirectory);
rm('-rf', assetsPath);
rm('-rf', '*.zip', path.resolve(__dirname, '../*.zip'));
mkdir('-p', assetsPath);
// cp('-R', 'CubeModule.json', config.build.assetsRoot);
cp('-R', 'www/*', assetsPath);


spinner.stop();