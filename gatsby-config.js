module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.lyyourc.com',
    description: '这里是 ly你个c 的博客',
    title: 'ly你个c',
    disqus: 'lyyourc',
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
      { type: 'rss', href: '/rss.xml' },
    ],
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'lyyourc',
        short_name: 'lyyourc',
        start_url: '/',
        theme_color: '#fff',
        background_color: '#fff',
        display: 'standalone',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
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
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: {
                    frontmatter: { draft: { ne: true } }
                    fileAbsolutePath: { regex: "/post/" }
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        date
                        excerpt
                      }
                      fields {
                        slug
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            setup: ({ query: { site: { siteMetadata } } }) => {
              return {
                title: siteMetadata.title,
                description: siteMetadata.description,
                feed_url: siteMetadata.siteUrl + '/rss.xml',
                site_url: siteMetadata.siteUrl,
                generator: 'GatsbyJS',
              }
            },
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(({ node }) => {
                return {
                  title: node.frontmatter.title,
                  description: node.frontmatter.excerpt || node.excerpt,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                }
              }),
          },
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
