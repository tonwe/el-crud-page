const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'examples/index.html',
      filename: 'index.html',
      title: 'el-crud-page Demo'
    }
  },
  outputDir: 'demo-dist',
  publicPath: './',
  chainWebpack: config => {
    // 示例直接引用库源码，examples 和 src 都需要经过 Babel。
    config.module
      .rule('js')
      .include
      .add(path.resolve(__dirname, 'examples'))
      .add(path.resolve(__dirname, 'src'))
      .end()
      .exclude
      .add(/node_modules/)
      .end();
    
    // 配置别名
    config.resolve.alias
      .set('@', __dirname + '/src');
  },
  css: {
    extract: false
  },
  devServer: {
    port: 8080,
    hot: true,
    open: true
  }
};
