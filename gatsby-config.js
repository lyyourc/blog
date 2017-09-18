module.exports = {
  siteMetadata: {
    title: 'ly你个c',
    navs: [
      {
        title: '首页',
        subTitle: '注意了!不要忘记放到收藏夹(^D)',
        to: '/',
        exact: true,
      },
      {
        title: '博客',
        subTitle: '写博客的时候不要发出啪啪啪的键盘声',
        to: '/posts',
        exact: false,
      },
    ],
    socials: [
      { type: 'github', username: 'lyyourc' },
      { type: 'twitter', username: 'lyyourc' },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-63900271-1',
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: '#E5637C',
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 768,
              // Remove the default behavior of adding a link to each
              // image.
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 78,
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
  ],
}
