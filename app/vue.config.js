const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    client: {
      entry: 'src/client/main.ts',
      title: 'NewsNow Traffic Lights',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'client'],
    },
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    const tsLoaderMap = config.module.rule('ts').use('ts-loader');

    tsLoaderMap.options(Object.assign(tsLoaderMap.get('options'), { configFile: `${__dirname}/tsconfig-client.json` }));
  },
});
