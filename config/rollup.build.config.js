const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-es').minify;
const Visualizer = require('rollup-plugin-visualizer');
const replaceTsDefaultImports = require('@dcs/ngx-build-tools')
  .replaceTypescriptDefaultImportsPlugin;
const path = require('path');

const pkg = require('../package.json');
const external = [...Object.keys(pkg.peerDependencies || {}), 'os'];

const plugins = [
  replaceTsDefaultImports(),
  resolve(),
  commonjs(),
  uglify({}, minify)
];

const baseConfig = {
  entry: 'build/index.js',
  sourceMap: true,
  plugins: plugins,
  external: external
};

module.exports = [
  // main
  Object.assign({}, baseConfig, {
    entry: 'build/tmp/es5/index.js',
    dest: 'build/bundles/ngx-lib-starter.umd.js',
    moduleName: 'ngx-lib-starter',
    format: 'umd'
  }),
  // module
  Object.assign({}, baseConfig, {
    entry: 'build/tmp/es5/index.js',
    dest: 'build/@dcs/ngx-lib-starter/ngx-lib-starter.es5.js',
    format: 'es'
  }),
  // es2015
  Object.assign({}, baseConfig, {
    entry: 'build/index.js',
    dest: 'build/@dcs/ngx-lib-starter/ngx-lib-starter.js',
    format: 'es',
    plugins: [
      ...plugins,
      Visualizer({
        filename: './report/build-statistics.html'
      })
    ]
  })
];
