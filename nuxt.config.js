module.exports = {
  build: {
    postcss: [
      require('postcss-cssnext')(),
      require('postcss-responsive-type')(),
    ],
    vendor: ['axios'],
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
