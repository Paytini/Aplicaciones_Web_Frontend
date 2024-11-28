const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        url: require.resolve('url/'),
      },
    },
  },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
