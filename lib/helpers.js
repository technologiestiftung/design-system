import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { bundleMDX } from "mdx-bundler";

export const getSortedData = (directory) => {
  // Get file names under /docs
  const fileNames = fs.readdirSync(directory);
  const allDocsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx?$/, '');

    // Read markdown file as string
    const fullPath = path.join(directory, fileName);
    const source = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(source);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort docs by date
  return allDocsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export const getAllIds = (directory) => {
  const fileNames = fs.readdirSync(directory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx?$/, ''),
      },
    };
  });
}

export const getData = async(id, directory) => {
  // get filename no matter the file-type
  const fileNames = fs.readdirSync(directory);
  const file = fileNames.find(name => name.indexOf(id) == 0);

  const fullPath = path.join(directory, file);
  const source = fs.readFileSync(fullPath, 'utf8');


  // Use gray-matter to parse the doc metadata section
  const matterResult = matter(source);


  const { code, frontmatter } = await bundleMDX(
    { source },
    {
      xdmOptions(options) {
        options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
        options.rehypePlugins = [
          ...(options?.rehypePlugins ?? []),
          rehypePrism,
          remarkMdxCodeMeta
        ];
        return options;
      },
    }
  );
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();


  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
    contentHtml,
    frontmatter,
    code,
  };
}