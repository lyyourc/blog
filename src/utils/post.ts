export interface Post {
  title: string
  date: string
  draft: boolean
  fields: {
    slug: string
  }
  excerpt: string
  code: {
    scope: string
    body: string
  }
}

export interface PostUnnormalized {
  frontmatter: {
    title: string
    date: string
    draft: boolean
  }
  fields: {
    slug: string
  }
  excerpt: string
  code: {
    scope: string
    body: string
  }
}

export interface YearPort {
  year: number
  posts: Post[]
}

export function normalizePost(post: PostUnnormalized) {
  return {
    ...post,
    ...post.frontmatter,
  }
}

export function sortPostsBySameYear(posts: Post[] = []): YearPort[] {
  return posts
    .sort((a, b) => {
      const compare = new Date(b.date).getTime() - new Date(a.date).getTime()
      return compare
    }) 
    .reduce((prev: YearPort[], post: Post) => {
      const year: number = new Date(post.date).getFullYear()
      const yearPosts = prev.find(p => p.year === year)
      !yearPosts
        ? prev.push({ year, posts: [post] })
        : yearPosts.posts.push(post)

      return prev
    }, [])
}
