import dateFns from 'date-fns'

function sortPostsBySameYear(posts = []) {
  return posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((prev, post) => {
      const year = dateFns.format(post.date, 'YYYY')
      const yearPosts = prev.find(p => p.year === year)
      
      !yearPosts
        ? prev.push({ year, posts: [post] })
        : yearPosts.posts.push(post)

      return prev
    }, [])
}

// function fetchPosts(path) {
//   const files = require.context('../contents', true, /\.md$/)

//   return files.keys().map(name => {
//     const { attributes, body, frontmatter } = files(name)
//     // get post's title
//     const key = name
//       .split('/').slice(-1)[0]
//       .split('.').slice(0, -1).join('.') 

//     return Object.assign({}, attributes,
//       { key, body, frontmatter, })
//   })
// }

export {
  sortPostsBySameYear,
  // fetchPosts,
}