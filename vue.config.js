const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "^/api-crm": {
        target: "http://192.168.20.221:5000/",
        changeOrigin: true,
        secure: false,
        logLevel: "debug",
        pathRewrite: { "^/api-crm": "/api-crm" },
      },
    },
  },

})
