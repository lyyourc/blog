import frontMatter from 'front-matter'
import dateFns from 'date-fns'

function sortPostsBySameYear(posts = []) {
  return posts
    .map(setFrontMatterForPost)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((prev, post) => {
      const date = post.date || post.created_at
      const year = `post${dateFns.format(date, 'YYYY')}`
      prev[year] = [...(prev[year] || []), post]
      return prev
    }, {})
}

function setFrontMatterForPost(post = {}) {
  return Object.assign({}, post, frontMatter(post.body).attributes || {})
}

function fetchPosts(path) {
  const files = require.context('../static', true, /\.md$/)
  return files.keys().map(key => {
    const { attributes, body, frontmatter } = files(key)
    return {
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
