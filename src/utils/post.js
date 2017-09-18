export function sortPostsBySameYear(posts = []) {
  return posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((prev, post) => {
      const year = new Date(post.date).getFullYear()
      const yearPosts = prev.find(p => p.year === year)
      !yearPosts
        ? prev.push({ year, posts: [post] })
        : yearPosts.posts.push(post)

      return prev
    }, [])
}
