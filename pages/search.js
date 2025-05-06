import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import { getAllCategories } from '../lib/categories';
import CanonicalUrl from '../components/CanonicalUrl';
import styles from '../styles/search.module.css';

export default function Search({ allPosts, categories }) {
  const router = useRouter();
  const { q } = router.query;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Initialize search term from URL query parameter
  useEffect(() => {
    if (q) {
      setSearchTerm(q);
    }
  }, [q]);
  
  // Perform search when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search delay for better UX
    const timer = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      
      // Search in posts
      const filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(term) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(term)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
      );
      
      setSearchResults(filteredPosts);
      setIsSearching(false);
      
      // Update URL with search query for shareable links
      router.push({
        pathname: '/search',
        query: { q: searchTerm }
      }, undefined, { shallow: true });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, allPosts, router]);
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already triggered by the useEffect hook
  };
  
  return (
    <Layout>
      <Head>
        <title>{searchTerm ? `Search results for "${searchTerm}" | Party.net` : 'Search | Party.net'}</title>
        <meta 
          name="description" 
          content={searchTerm 
            ? `Search results for "${searchTerm}" - Find party planning tips and ideas at Party.net` 
            : 'Search for party planning tips, themes, and ideas at Party.net'
          } 
        />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <CanonicalUrl />
      
      <div className={styles.container}>
        <h1 className={styles.title}>
          {searchTerm ? `Search results for "${searchTerm}"` : 'Search Party.net'}
        </h1>
        
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for party ideas, themes, tips..."
            className={styles.searchInput}
            aria-label="Search"
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
        
        {isSearching ? (
          <div className={styles.searching}>Searching...</div>
        ) : searchTerm && searchResults.length === 0 ? (
          <div className={styles.noResults}>
            <p>No results found for "{searchTerm}". Try different keywords or browse our categories below.</p>
            
            <div className={styles.categorySuggestions}>
              <h2>Browse by Category</h2>
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
          </div>
        ) : searchResults.length > 0 ? (
          <div className={styles.results}>
            <p className={styles.resultCount}>
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>
            
            <ul className={styles.resultsList}>
              {searchResults.map(post => (
                <li key={post.id} className={styles.resultItem}>
                  <Link href={`/posts/${post.id}`} className={styles.resultLink}>
                    <h2>{post.title}</h2>
                    {post.excerpt && <p className={styles.resultExcerpt}>{post.excerpt}</p>}
                    {post.tags && (
                      <div className={styles.resultTags}>
                        {post.tags.map(tag => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.searchSuggestions}>
            <h2>Popular Searches</h2>
            <div className={styles.suggestionsList}>
              <button 
                onClick={() => setSearchTerm('birthday party')}
                className={styles.suggestionButton}
              >
                Birthday Party
              </button>
              <button 
                onClick={() => setSearchTerm('wedding ideas')}
                className={styles.suggestionButton}
              >
                Wedding Ideas
              </button>
              <button 
                onClick={() => setSearchTerm('holiday celebration')}
                className={styles.suggestionButton}
              >
                Holiday Celebration
              </button>
              <button 
                onClick={() => setSearchTerm('budget friendly')}
                className={styles.suggestionButton}
              >
                Budget Friendly
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getSortedPostsData();
  const categories = getAllCategories();
  
  return {
    props: {
      allPosts,
      categories
    },
    // Revalidate every hour
    revalidate: 3600
  };
}
