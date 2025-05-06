import Head from 'next/head';

/**
 * SeoPerformanceHead component for optimizing page loading performance
 * Includes preloading, preconnect, and resource hints for better performance
 */
export default function SeoPerformanceHead() {
  return (
    <Head>
      {/* Preconnect to external domains to speed up resource loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      
      {/* DNS prefetch for domains that will be used */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      
      {/* Preload critical assets */}
      {/* System fonts are used instead of custom fonts for better performance */}
      
      {/* Meta tags for better SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#4a6fa5" />
      
      {/* Performance optimization */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}
