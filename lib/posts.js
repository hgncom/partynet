import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Use dynamic import for fs to ensure it's only used server-side
let fs;
if (typeof window === 'undefined') {
  fs = require('fs');
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Filter out the problematic post
  const filteredFileNames = fileNames.filter(fileName => 
    fileName !== 'top-25-party-planners-2025.md'
  );
  
  const allPostsData = filteredFileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Get the metadata
    const { date, ...otherData } = matterResult.data;
    
    // Ensure we have a valid date string
    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    
    // Convert YYYY-MM-DD to YYYY-MM-DDT12:00:00Z format
    // This ensures consistent UTC dates without timezone issues
    const isoDate = `${dateStr}T12:00:00Z`;
    
    // Combine the data with the id
    return {
      id,
      date: isoDate,
      ...otherData,
    };
  });

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (new Date(a) < new Date(b)) {
      return 1;
    } else if (new Date(a) > new Date(b)) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Filter out the problematic post
  const filteredFileNames = fileNames.filter(fileName => 
    fileName !== 'top-25-party-planners-2025.md'
  );

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return filteredFileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Ensure date is in ISO string format
  const { date, ...otherMetadata } = matterResult.data;
  const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
  const isoDate = `${dateStr}T12:00:00Z`;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Find related posts by shared tags
  const allPostsData = fs.readdirSync(postsDirectory).map((fileName) => {
    const relId = fileName.replace(/\.md$/, '');
    const relPath = path.join(postsDirectory, fileName);
    const relContents = fs.readFileSync(relPath, 'utf8');
    const relMatter = matter(relContents);
    return {
      id: relId,
      date: relMatter.data.date,
      title: relMatter.data.title,
      tags: relMatter.data.tags || [],
    };
  });
  let relatedPosts = [];
  if (matterResult.data.tags && matterResult.data.tags.length > 0) {
    relatedPosts = allPostsData
      .filter(post => post.id !== id && post.tags.some(tag => matterResult.data.tags.includes(tag)))
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 3);
  }

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    relatedPosts,
    ...otherMetadata,
    date: isoDate,
  };
}
