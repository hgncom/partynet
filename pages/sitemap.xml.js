import { getAllPostIds, getSortedPostsData } from '../lib/posts';
import { getAllCategories } from '../lib/categories';

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = 'https://partynet.netlify.app';
  const allPosts = getSortedPostsData();
  const allCategories = getAllCategories();
  const currentDate = new Date().toISOString();
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Static Pages -->
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      
      <!-- Category Pages -->
      ${allCategories.map(category => `
      <url>
        <loc>${baseUrl}/categories/${category.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
      `).join('')}
      
      <!-- Blog Posts -->
      ${allPosts.map(post => `
      <url>
        <loc>${baseUrl}/posts/${post.id}</loc>
        <lastmod>${post.date || currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      `).join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
