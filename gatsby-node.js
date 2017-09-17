const path = require('path')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === 'MarkdownRemark') {
    const { relativePath } = getNode(node.parent)
    const { name, dir } = path.parse(relativePath)
    createNodeField({ node, name: 'slug', value: `/${dir}/${name}` })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        const { slug } = node.fields

        // exclude '_' started slug
        if (/_/.test(slug)) return

        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/post.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug,
          },
        })
      })
      resolve()
    })
  })
}
