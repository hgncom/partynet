import Link from 'next/link';
import { useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';
import styles from '../styles/enhanced-related-posts.module.css';

export default function EnhancedRelatedPosts({ currentPostId, currentTags, allPosts }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    // Filter out the current post
    const otherPosts = allPosts.filter(post => post.id !== currentPostId);
    
    // Calculate relevance score based on tag matches
    const postsWithRelevance = otherPosts.map(post => {
      const postTags = post.tags || [];
      // Count matching tags
      const matchingTags = currentTags.filter(tag => postTags.includes(tag));
      const relevanceScore = matchingTags.length;
      
      return {
        ...post,
        relevanceScore
      };
    });
    
    // Sort by relevance score (highest first)
    const sortedPosts = postsWithRelevance.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Get top 3 most relevant posts
    setRelatedPosts(sortedPosts.slice(0, 3));
  }, [currentPostId, currentTags, allPosts]);
  
  if (relatedPosts.length === 0) return null;
  
  return (
    <section className={styles.relatedPostsSection}>
      <h2 className={styles.relatedPostsHeading}>You Might Also Like</h2>
      <div className={styles.relatedPostsGrid}>
        {relatedPosts.map(post => (
          <article key={post.id} className={styles.relatedPostCard}>
            <Link href={`/posts/${post.id}`} className={styles.relatedPostLink}>
              <div className={styles.relatedPostImageContainer}>
                <OptimizedImage 
                  src={post.featuredImage} 
                  alt={post.featuredImageAlt || `Image for ${post.title}`}
                  className={styles.relatedPostImage}
                />
              </div>
              <div className={styles.relatedPostContent}>
                <h3 className={styles.relatedPostTitle}>{post.title}</h3>
                <p className={styles.relatedPostExcerpt}>
                  {post.excerpt.length > 120 
                    ? `${post.excerpt.substring(0, 120)}...` 
                    : post.excerpt}
                </p>
                <span className={styles.readMoreLink}>Read More →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
