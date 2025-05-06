import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * CanonicalUrl component for setting the canonical URL
 * Helps prevent duplicate content issues by specifying the preferred URL for a page
 * 
 * @param {Object} props - Component props
 * @param {string} props.customPath - Optional custom path to override the current path
 */
export default function CanonicalUrl({ customPath }) {
  const router = useRouter();
  
  // Base URL for the site
  const baseUrl = 'https://partynet.netlify.app';
  
  // Use custom path if provided, otherwise use current path
  const canonicalPath = customPath || router.asPath;
  
  // Remove query parameters for canonical URL
  const canonicalUrl = `${baseUrl}${canonicalPath.split('?')[0]}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
