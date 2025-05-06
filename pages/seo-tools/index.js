import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import CanonicalUrl from '../../components/CanonicalUrl';
import styles from '../../styles/seo-dashboard.module.css';

export default function SeoDashboard() {
  const [pageInsights, setPageInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Simulated page insights data - in a real app, this would come from an API
  useEffect(() => {
    const simulatePageInsights = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setPageInsights({
          performance: 85,
          accessibility: 92,
          bestPractices: 88,
          seo: 95,
          lastUpdated: new Date().toISOString(),
          topPages: [
            { url: '/posts/ultimate-birthday-party-planning-guide', score: 95 },
            { url: '/categories/birthday', score: 90 },
            { url: '/', score: 88 }
          ],
          improvementAreas: [
            'Image optimization could be improved on some pages',
            'Consider adding more internal links between related content',
            'Some meta descriptions could be more compelling'
          ]
        });
        
        setLoading(false);
      }, 1500);
    };
    
    simulatePageInsights();
  }, []);
  
  return (
    <Layout>
      <Head>
        <title>SEO Dashboard | Party.net</title>
        <meta name="description" content="Monitor and improve your Party.net SEO performance" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <CanonicalUrl />
      
      <div className={styles.container}>
        <h1 className={styles.title}>SEO Dashboard</h1>
        <p className={styles.description}>
          Monitor your site's SEO performance and access tools to improve your search engine visibility.
        </p>
        
        <div className={styles.toolsGrid}>
          <div className={styles.toolCard}>
            <h2>Schema Validator</h2>
            <p>Validate structured data markup on your pages to ensure proper implementation.</p>
            <Link href="/seo-tools/schema-validator" className={styles.toolLink}>
              Open Schema Validator
            </Link>
          </div>
          
          <div className={styles.toolCard}>
            <h2>Meta Tag Analyzer</h2>
            <p>Check your meta tags for SEO best practices and get recommendations for improvement.</p>
            <span className={styles.comingSoon}>Coming Soon</span>
          </div>
          
          <div className={styles.toolCard}>
            <h2>Internal Link Checker</h2>
            <p>Analyze your internal linking structure to improve site navigation and SEO.</p>
            <span className={styles.comingSoon}>Coming Soon</span>
          </div>
          
          <div className={styles.toolCard}>
            <h2>Image Optimizer</h2>
            <p>Optimize your images for faster loading and better search engine visibility.</p>
            <span className={styles.comingSoon}>Coming Soon</span>
          </div>
        </div>
        
        <div className={styles.insightsSection}>
          <h2 className={styles.sectionTitle}>Page Insights</h2>
          
          {loading ? (
            <div className={styles.loadingState}>Loading insights...</div>
          ) : pageInsights ? (
            <>
              <div className={styles.scoreGrid}>
                <div className={styles.scoreCard}>
                  <h3>Performance</h3>
                  <div className={styles.scoreValue} style={{ 
                    color: pageInsights.performance >= 90 ? '#10b981' : 
                           pageInsights.performance >= 70 ? '#f59e0b' : '#ef4444' 
                  }}>
                    {pageInsights.performance}
                  </div>
                </div>
                
                <div className={styles.scoreCard}>
                  <h3>Accessibility</h3>
                  <div className={styles.scoreValue} style={{ 
                    color: pageInsights.accessibility >= 90 ? '#10b981' : 
                           pageInsights.accessibility >= 70 ? '#f59e0b' : '#ef4444' 
                  }}>
                    {pageInsights.accessibility}
                  </div>
                </div>
                
                <div className={styles.scoreCard}>
                  <h3>Best Practices</h3>
                  <div className={styles.scoreValue} style={{ 
                    color: pageInsights.bestPractices >= 90 ? '#10b981' : 
                           pageInsights.bestPractices >= 70 ? '#f59e0b' : '#ef4444' 
                  }}>
                    {pageInsights.bestPractices}
                  </div>
                </div>
                
                <div className={styles.scoreCard}>
                  <h3>SEO</h3>
                  <div className={styles.scoreValue} style={{ 
                    color: pageInsights.seo >= 90 ? '#10b981' : 
                           pageInsights.seo >= 70 ? '#f59e0b' : '#ef4444' 
                  }}>
                    {pageInsights.seo}
                  </div>
                </div>
              </div>
              
              <div className={styles.insightsGrid}>
                <div className={styles.insightCard}>
                  <h3>Top Performing Pages</h3>
                  <ul className={styles.pageList}>
                    {pageInsights.topPages.map((page, index) => (
                      <li key={index} className={styles.pageItem}>
                        <span className={styles.pageUrl}>{page.url}</span>
                        <span className={styles.pageScore}>{page.score}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.insightCard}>
                  <h3>Areas for Improvement</h3>
                  <ul className={styles.improvementList}>
                    {pageInsights.improvementAreas.map((area, index) => (
                      <li key={index} className={styles.improvementItem}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className={styles.lastUpdated}>
                Last updated: {new Date(pageInsights.lastUpdated).toLocaleString()}
              </div>
            </>
          ) : (
            <div className={styles.errorState}>Failed to load insights. Please try again later.</div>
          )}
        </div>
        
        <div className={styles.externalToolsSection}>
          <h2 className={styles.sectionTitle}>External SEO Tools</h2>
          <div className={styles.externalToolsGrid}>
            <a 
              href="https://search.google.com/search-console" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.externalToolCard}
            >
              <h3>Google Search Console</h3>
              <p>Monitor your site's presence in Google Search results</p>
            </a>
            
            <a 
              href="https://pagespeed.web.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.externalToolCard}
            >
              <h3>PageSpeed Insights</h3>
              <p>Analyze your page performance on mobile and desktop</p>
            </a>
            
            <a 
              href="https://search.google.com/test/rich-results" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.externalToolCard}
            >
              <h3>Rich Results Test</h3>
              <p>Test your structured data for rich search results</p>
            </a>
            
            <a 
              href="https://www.bing.com/webmasters/home" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.externalToolCard}
            >
              <h3>Bing Webmaster Tools</h3>
              <p>Monitor your site's presence in Bing search results</p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
