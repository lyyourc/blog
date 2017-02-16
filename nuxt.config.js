const fs = require('fs')
const files = fs.readdirSync('contents')
const fileNames = files.map(file => ({
  id: file.split('.').slice(0, -1).join('.')
}))

module.exports = {
  build: {
    postcss: [
      require('postcss-cssnext')(),
      require('postcss-responsive-type')(),
    ],
    vendor: ['date-fns'],
    extend(config, { dev, isClient }) {
      // config is the webpack config
      // dev is a boolean, equals false when `nuxt build`
      // isClient is a boolean, let you know when you extend
      // the config for the client bundle or the server bundle
      const loaders = [
        {
          rules: [{ test: /\.yml$/, loader: 'json-loader!yaml-loader' }]
        },
        {
          rules: [
            {
              test: /\.md$/,
              loader: './utils/md-front-matter-loader.js',
              options: {
                breaks: true
              },
            },
          ]
        },
      ]

      config.module.rules = [...config.module.rules, ...loaders]
    },
  },
  generate: {
    routeParams: {
      '/posts/:id': fileNames,
    },
  },
  
  /*
  ** Headers of the page
  */
  head: {
    title: 'lyyourc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'lyyourc\'s blog' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#aaa' }
}
