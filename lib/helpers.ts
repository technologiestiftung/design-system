import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'
import remarkMdxCodeMeta from 'remark-mdx-code-meta'
import type { ProcessorOptions } from '@mdx-js/esbuild/lib'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism'
import remarkSlug from 'remark-slug'

interface GetData {
  id: string
  name: string
  contentHtml: string
  code: string
  date?: Date
  thumbnail?: string
}

export const getSortedData = (directory:string): GetData[] => {

  const fileNames = fs.readdirSync(directory)
  const allDocsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx?$/, '')

    // Read markdown file as string
    const fullPath = path.join(directory, fileName)
    const source = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(source)

    // Combine the data with the id
    return {
      id,
      name: matterResult.data.name,
      contentHtml: matterResult.data.contentHtml,
      code: matterResult.data.code,
      ...matterResult.data,
    }
  })
  // Sort docs by date

  return allDocsData.sort(({ name: a }, { name: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export const getAllIds = (directory: string) => {
  const fileNames = fs.readdirSync(directory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx?$/, ''),
      },
    }
  })
}


export const getData = async (id: string, directory: string): Promise<GetData> => {
  // get filename no matter the file-type
  const fileNames = fs.readdirSync(directory)
  const file = fileNames.find((name) => name.indexOf(id) == 0)

  const fullPath = path.join(directory, file)
  const source = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the doc metadata section
  const matterResult = matter(source);

  const options = {
    mdxOptions(options: ProcessorOptions) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkSlug,
        remarkMdxCodeMeta
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeCodeTitles,
        rehypePrism,
      ]
      return options
    },
  }

  const { code, matter: frontmatter } = await bundleMDX({ source, ...options })
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    code,
    name: frontmatter.data.name,
    date: frontmatter.data.date,
    thumbnail: frontmatter.data.thumbnail,
  }
}
