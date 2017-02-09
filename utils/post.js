import frontMatter from 'front-matter'
import dateFns from 'date-fns'

function sortPostsBySameYear(posts = []) {
  return posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((prev, post) => {
      const year = dateFns.format(post.date, 'YYYY')
      prev[year] = [...(prev[year] || []), post]
      return prev
    }, {})
}

function fetchPosts(path) {
  const files = require.context('../contents', true, /\.md$/)
  return files.keys().map(key => {
    const { attributes, body, frontmatter } = files(key)
    return {
      key: key.split('/').slice(-1)[0],
      ...attributes,
      body,
      frontmatter,
    }
  })
}

export {
  sortPostsBySameYear,
  setFrontMatterForPost,
  fetchPosts,
}
