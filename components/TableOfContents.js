import { useState, useEffect } from 'react';
import styles from '../styles/table-of-contents.module.css';

export default function TableOfContents({ contentRef, title = 'Table of Contents', startAfterSelector = 'header', stopBeforeSelector = '.author-bio' }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  
  // Extract headings from the content
  useEffect(() => {
    if (!contentRef?.current) return;
    
    // Get all h2 and h3 elements from the content
    const elements = contentRef.current.querySelectorAll('h2, h3');
    const headingElements = Array.from(elements);
    
    // Create TOC items from headings
    const items = headingElements.map(heading => {
      // Create an ID from the heading text if it doesn't have one
      if (!heading.id) {
        heading.id = heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      
      return {
        id: heading.id,
        text: heading.textContent,
        level: heading.tagName === 'H2' ? 2 : 3
      };
    });
    
    setHeadings(items);
  }, [contentRef]);
  
  // Set up intersection observer to highlight active section and handle TOC visibility
  useEffect(() => {
    if (!contentRef?.current) return;
    
    // Observer for active heading
    const headingObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1
      }
    );
    
    // Get the TOC element
    const tocElement = document.querySelector(`.${styles.tableOfContents}`);
    if (!tocElement) return;
    
    // Observer for the element that should stop the TOC
    const stopElement = document.querySelector(stopBeforeSelector);
    if (stopElement) {
      const stopObserver = new IntersectionObserver(
        ([entry]) => {
          // When stop element is about to be visible, make TOC disappear
          if (entry.isIntersecting) {
            tocElement.style.display = 'none';
          } else {
            tocElement.style.display = '';
          }
        },
        {
          threshold: 0.1,
          rootMargin: '-100px 0px 0px 0px' // Start hiding before it fully enters viewport
        }
      );
      
      stopObserver.observe(stopElement);
    }
    
    // Observe all heading elements
    const elements = contentRef.current.querySelectorAll('h2, h3');
    elements.forEach(element => headingObserver.observe(element));
    
    // Cleanup
    return () => {
      elements.forEach(element => headingObserver.unobserve(element));
    };
  }, [contentRef, headings, startAfterSelector, stopBeforeSelector]);
  
  if (headings.length < 3) return null; // Only show TOC for longer articles
  
  return (
    <nav className={styles.tableOfContents} aria-label="Table of contents">
      <h2 className={styles.tocTitle}>{title}</h2>
      <ol className={styles.tocList}>
        {headings.map(heading => (
          <li 
            key={heading.id}
            className={`
              ${styles.tocItem} 
              ${heading.level === 3 ? styles.tocSubItem : ''} 
              ${heading.id === activeId ? styles.tocActive : ''}
            `}
          >
            <a 
              href={`#${heading.id}`}
              className={styles.tocLink}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id).scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
