import React from 'react';
import styles from '../styles/enhanced-faq.module.css';

/**
 * EnhancedFAQSchema component that both renders FAQs visually and adds schema markup
 * This improves chances of getting FAQ rich snippets in search results
 */
export default function EnhancedFAQSchema({ faqs, title = "Frequently Asked Questions" }) {
  if (!faqs || faqs.length === 0) return null;
  
  // Create the FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
  
  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqTitle}>{title}</h2>
      
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <details key={index} className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              {faq.question}
            </summary>
            <div 
              className={styles.faqAnswer}
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </details>
        ))}
      </div>
      
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
