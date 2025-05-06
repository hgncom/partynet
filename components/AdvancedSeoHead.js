import Head from 'next/head';

/**
 * AdvancedSeoHead component with comprehensive SEO optimizations
 * Includes critical CSS inlining, resource hints, and advanced meta tags
 */
export default function AdvancedSeoHead({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://partynet.netlify.app/images/og-default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = [],
  noIndex = false,
  structuredData = null,
  alternateLanguages = []
}) {
  // Format keywords as a string
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Party.net" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Robots directives */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Alternate language versions */}
      {alternateLanguages.map(lang => (
        <link 
          key={lang.code}
          rel="alternate" 
          hrefLang={lang.code} 
          href={lang.url} 
        />
      ))}
      
      {/* Preload critical fonts */}
      <link 
        rel="preload" 
        href="/fonts/system-font.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      
      {/* Resource hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#4a6fa5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Critical CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Critical path CSS */
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #333;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .main-content {
          padding-top: 2rem;
        }
        /* Add more critical CSS as needed */
      `}} />
    </Head>
  );
}
