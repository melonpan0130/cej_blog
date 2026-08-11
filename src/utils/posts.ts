import { parseFrontmatter } from './frontmatter'

export interface Post {
  fileName: string
  title: string
  date: string
  category: string
  description: string
  path: string
}

const postModules = import.meta.glob('../posts/**/*.html', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

function parsePostPath(filePath: string): { category: string; fileName: string; path: string } {
  const relative = filePath.replace(/^\.\.\/posts\//, '').replace(/\.html$/, '')
  const parts = relative.split('/')
  const fileName = parts.pop() ?? ''
  const category = parts.join('/')
  const path = category ? `${category}/${fileName}` : fileName
  return { category, fileName, path }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function buildDescription(content: string, fallback: string): string {
  const text = stripHtml(content)
  if (!text) return fallback
  return text.length > 160 ? `${text.slice(0, 157)}...` : text
}

function parsePost(filePath: string, rawContent: string): Post {
  const { data, content } = parseFrontmatter(rawContent)
  const { category, fileName, path } = parsePostPath(filePath)
  const title = (data.title as string | undefined) ?? fileName
  const date = (data.date as string | undefined) ?? ''
  const description =
    (data.description as string | undefined) ?? buildDescription(content, title)

  return {
    fileName,
    title,
    date,
    category,
    description,
    path
  }
}

const parsedPosts = Object.entries(postModules).map(([filePath, rawContent]) =>
  parsePost(filePath, rawContent)
)

export function getAllPosts(): Post[] {
  return [...parsedPosts]
}

export function getPostByPath(category: string, fileName: string): Post | undefined {
  return parsedPosts.find((post) => post.category === category && post.fileName === fileName)
}

export function getPostContent(postPath: string): string {
  const entry = Object.entries(postModules).find(([filePath]) => {
    const { path } = parsePostPath(filePath)
    return path === postPath
  })

  if (!entry) return ''
  const { content } = parseFrontmatter(entry[1])
  return content.trim()
}

export function getNaviBarMap(): Record<string, Record<string, unknown>> {
  const categories = [...new Set(parsedPosts.map((post) => post.category))]
    .sort()
    .map((category) => category.split('/'))

  const obj: Record<string, Record<string, unknown>> = {}

  categories.forEach((segments) => {
    let currentLevel: Record<string, Record<string, unknown>> = obj
    segments.forEach((segment) => {
      if (!currentLevel[segment]) {
        currentLevel[segment] = {}
      }
      currentLevel = currentLevel[segment] as Record<string, Record<string, unknown>>
    })
  })

  return obj
}
