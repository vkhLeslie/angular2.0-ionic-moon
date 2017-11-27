// https://github.com/shelljs/shelljs
require('shelljs/global');
var path = require('path');
var buildConfig = require('../config/buildConfig');//打包配置
var ora = require('ora');
var webpackConfig = require('./webpack.config.js');
env.NODE_ENV = 'production';

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...');
spinner.start();

var assetsPath = path.join(buildConfig.buildTest.assetsRoot, buildConfig.buildTest.assetsSubDirectory);
rm('-rf', assetsPath)
rm('-rf', '*.zip', path.resolve(__dirname, '../*.zip'))
mkdir('-p', assetsPath)
//cp('-R', 'CubeModule.json', config.build.assetsRoot);
cp('-R', 'www/*', assetsPath)

spinner.stop();
