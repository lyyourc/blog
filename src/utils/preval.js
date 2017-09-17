// @preval
const path = require('path')
const fs = require('fs')
const { readdirSync, readFileSync } = require('fs')
const fm = require('front-matter')

const resolve = name => path.join(__dirname, name)

const PATHS = {
  pages: resolve('../pages'),
  posts: resolve('../../posts'),
}

exports.pages = readdirSync(PATHS.pages).map(file => {
  const { name } = path.parse(file)
  return {
    path: '/' + name,
    title: name,
    posts: getPosts(name),
  }
})

function getPosts(part) {
  const postPath = path.join(PATHS.posts, part)

  if (!fs.existsSync(postPath)) return []

  return readdirSync(postPath)
    .map(file => {
      const filePath = path.join(postPath, file)
      const { attributes } = fm(readFileSync(filePath, 'utf-8'))

      return {
        path: `/${part}/${file}`,
        ...attributes,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
