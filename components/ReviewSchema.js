import React from 'react';
import styles from '../styles/review-schema.module.css';

/**
 * ReviewSchema component for implementing review structured data
 * Enhances SEO for product recommendations and service reviews
 */
export default function ReviewSchema({
  itemReviewed = {
    type: 'Product', // Product, Service, LocalBusiness, etc.
    name: '',
    image: '',
    description: '',
    url: '',
    brand: '',
    sku: '',
    offers: null
  },
  reviewRating = {
    ratingValue: 4.5,
    bestRating: 5,
    worstRating: 1
  },
  author = {
    name: 'Party Planning Expert',
    type: 'Person'
  },
  publisher = {
    name: 'Party.net',
    type: 'Organization',
    logo: 'https://partynet.netlify.app/images/logo.png'
  },
  reviewBody = '',
  datePublished = new Date().toISOString().split('T')[0],
  pros = [],
  cons = []
}) {
  // Create the review schema
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
      description: itemReviewed.description,
      image: itemReviewed.image,
      url: itemReviewed.url
    },
    reviewRating: {
      '@type': 'Rating',
      ...reviewRating
    },
    author: {
      '@type': author.type,
      name: author.name
    },
    publisher: {
      '@type': publisher.type,
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo
      }
    },
    reviewBody: reviewBody,
    datePublished: datePublished
  };
  
  // Add brand if available
  if (itemReviewed.brand) {
    reviewSchema.itemReviewed.brand = {
      '@type': 'Brand',
      name: itemReviewed.brand
    };
  }
  
  // Add SKU if available
  if (itemReviewed.sku) {
    reviewSchema.itemReviewed.sku = itemReviewed.sku;
  }
  
  // Add offers if available
  if (itemReviewed.offers) {
    reviewSchema.itemReviewed.offers = {
      '@type': 'Offer',
      ...itemReviewed.offers
    };
  }
  
  // Generate star display based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className={styles.fullStar}>★</span>
        ))}
        {hasHalfStar && <span className={styles.halfStar}>★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className={styles.emptyStar}>☆</span>
        ))}
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewHeaderContent}>
          <h3 className={styles.reviewTitle}>
            Review: {itemReviewed.name}
          </h3>
          {renderStars(reviewRating.ratingValue)}
        </div>
        
        {itemReviewed.image && (
          <div className={styles.reviewImageContainer}>
            <img 
              src={itemReviewed.image} 
              alt={itemReviewed.name} 
              className={styles.reviewImage}
            />
          </div>
        )}
      </div>
      
      <div className={styles.reviewMeta}>
        <span className={styles.reviewAuthor}>By {author.name}</span>
        <span className={styles.reviewDate}>Published: {datePublished}</span>
      </div>
      
      {reviewBody && (
        <div className={styles.reviewContent}>
          <p className={styles.reviewBody}>{reviewBody}</p>
        </div>
      )}
      
      <div className={styles.reviewDetails}>
        {pros.length > 0 && (
          <div className={styles.prosContainer}>
            <h4 className={styles.prosTitle}>Pros</h4>
            <ul className={styles.prosList}>
              {pros.map((pro, index) => (
                <li key={`pro-${index}`} className={styles.prosItem}>{pro}</li>
              ))}
            </ul>
          </div>
        )}
        
        {cons.length > 0 && (
          <div className={styles.consContainer}>
            <h4 className={styles.consTitle}>Cons</h4>
            <ul className={styles.consList}>
              {cons.map((con, index) => (
                <li key={`con-${index}`} className={styles.consItem}>{con}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </div>
  );
}
