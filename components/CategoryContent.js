import React from 'react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import styles from '../styles/category-content.module.css';

/**
 * CategoryContent component for rich, SEO-optimized category pages
 * Includes semantic HTML, structured data, and content-rich sections
 */
export default function CategoryContent({
  category,
  posts,
  relatedCategories = []
}) {
  if (!category) return null;
  
  return (
    <div className={styles.categoryContainer}>
      <header className={styles.categoryHeader}>
        <h1 className={styles.categoryTitle}>{category.title}</h1>
        
        {category.description && (
          <div className={styles.categoryDescription}>
            {category.description}
          </div>
        )}
        
        {category.image && (
          <div className={styles.categoryImageContainer}>
            <OptimizedImage
              src={category.image}
              alt={category.title}
              width={1200}
              height={630}
              priority={true}
              className={styles.categoryImage}
            />
          </div>
        )}
      </header>
      
      {/* Expert Introduction - Rich content for SEO */}
      <section className={styles.expertIntro}>
        <h2 className={styles.sectionTitle}>Expert Guide to {category.title}</h2>
        <div className={styles.expertContent}>
          <div className={styles.expertText}>
            <p>
              Welcome to our comprehensive guide on {category.title.toLowerCase()}. 
              Whether you're planning an intimate gathering or a large celebration, 
              our expert tips and ideas will help you create memorable experiences.
            </p>
            <p>
              {category.longDescription || `Explore our curated collection of ${category.title.toLowerCase()} ideas, 
              from planning and decoration to themes and activities. Our team of party planning 
              experts has gathered the best resources to ensure your event is a success.`}
            </p>
          </div>
          {category.expertImage && (
            <div className={styles.expertImageContainer}>
              <OptimizedImage
                src={category.expertImage}
                alt={`Expert tips for ${category.title}`}
                width={400}
                height={300}
                className={styles.expertImage}
              />
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Posts */}
      <section className={styles.featuredPosts}>
        <h2 className={styles.sectionTitle}>Top {category.title} Ideas</h2>
        
        <div className={styles.postsGrid}>
          {posts.slice(0, 6).map(post => (
            <article key={post.id} className={styles.postCard}>
              <Link href={`/posts/${post.id}`}>
                <a className={styles.postLink}>
                  {post.featuredImage && (
                    <div className={styles.postImageContainer}>
                      <OptimizedImage
                        src={post.featuredImage}
                        alt={post.title}
                        width={400}
                        height={225}
                        className={styles.postImage}
                      />
                    </div>
                  )}
                  <div className={styles.postContent}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    {post.excerpt && (
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                    )}
                    <div className={styles.postMeta}>
                      {post.date && <span className={styles.postDate}>{post.date}</span>}
                      {post.readTime && <span className={styles.postReadTime}>{post.readTime} min read</span>}
                    </div>
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </div>
        
        {posts.length > 6 && (
          <div className={styles.viewMoreContainer}>
            <Link href={`/categories/${category.id}/all`}>
              <a className={styles.viewMoreButton}>
                View All {category.title} Ideas
              </a>
            </Link>
          </div>
        )}
      </section>
      
      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <section className={styles.relatedCategories}>
          <h2 className={styles.sectionTitle}>Related Categories</h2>
          
          <div className={styles.categoriesGrid}>
            {relatedCategories.map(relatedCategory => (
              <Link 
                key={relatedCategory.id} 
                href={`/categories/${relatedCategory.id}`}
              >
                <a className={styles.categoryCard}>
                  {relatedCategory.image && (
                    <div className={styles.relatedCategoryImageContainer}>
                      <OptimizedImage
                        src={relatedCategory.image}
                        alt={relatedCategory.title}
                        width={300}
                        height={200}
                        className={styles.relatedCategoryImage}
                      />
                    </div>
                  )}
                  <h3 className={styles.relatedCategoryTitle}>{relatedCategory.title}</h3>
                </a>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* SEO-rich conclusion */}
      <section className={styles.categoryConclusion}>
        <h2 className={styles.sectionTitle}>Planning Your Perfect {category.title}</h2>
        <div className={styles.conclusionContent}>
          <p>
            Creating the perfect {category.title.toLowerCase()} experience requires attention to detail 
            and thoughtful planning. From selecting the right venue and theme to coordinating 
            decorations and activities, every element contributes to a memorable event.
          </p>
          <p>
            Browse our comprehensive collection of {category.title.toLowerCase()} ideas and resources 
            to find inspiration for your next celebration. Whether you're planning a birthday party, 
            wedding reception, or corporate event, our expert guides provide valuable insights 
            and practical tips to ensure your event is a success.
          </p>
          <p>
            Don't forget to explore our related categories for additional ideas that can 
            complement your {category.title.toLowerCase()} planning. From food and beverages to 
            entertainment and party favors, we've got you covered with everything you need 
            for a spectacular celebration.
          </p>
        </div>
      </section>
    </div>
  );
}
