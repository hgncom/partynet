import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import { getAllCategories } from '../lib/categories';
import styles from '../styles/404.module.css';

export default function Custom404({ posts, categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  useEffect(() => {
    // Simple search functionality
    if (searchTerm.trim() === '') {
      setFilteredPosts([]);
    } else {
      const results = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      setFilteredPosts(results);
    }
  }, [searchTerm, posts]);
  
  return (
    <Layout>
      <Head>
        <title>Page Not Found | Party.net</title>
        <meta name="description" content="Sorry, we couldn't find the page you're looking for." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      
      <div className={styles.container}>
        <h1 className={styles.title}>Oops! Page Not Found</h1>
        <p className={styles.description}>
          We can't seem to find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        
        <div className={styles.searchContainer}>
          <h2>Find what you're looking for:</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for party ideas..."
            className={styles.searchInput}
          />
          
          {filteredPosts.length > 0 && (
            <div className={styles.searchResults}>
              <h3>Search Results:</h3>
              <ul className={styles.resultsList}>
                {filteredPosts.map(post => (
                  <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                    {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {searchTerm.trim() !== '' && filteredPosts.length === 0 && (
            <p className={styles.noResults}>No results found for "{searchTerm}". Try different keywords.</p>
          )}
        </div>
        
        <div className={styles.suggestions}>
          <h2>Popular Categories</h2>
          <div className={styles.categoryGrid}>
            {categories.map(category => (
              <Link 
                href={`/categories/${category.slug}`} 
                key={category.slug}
                className={styles.categoryCard}
              >
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
        
        <div className={styles.homeLink}>
          <Link href="/" className={styles.button}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  const categories = getAllCategories();
  
  return {
    props: {
      posts,
      categories
    }
  };
}
