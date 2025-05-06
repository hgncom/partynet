import Head from 'next/head';

/**
 * WebsiteSchema component for adding JSON-LD structured data for the website
 * This helps search engines understand the site structure and improves SEO
 */
export default function WebsiteSchema() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Party.net',
    description: 'Expert party planning tips, ideas, and guides for all occasions',
    url: 'https://partynet.netlify.app/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://partynet.netlify.app/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Party.net',
      logo: {
        '@type': 'ImageObject',
        url: 'https://partynet.netlify.app/images/party-default.jpg'
      }
    },
    sameAs: [
      'https://facebook.com/partynetofficial',
      'https://twitter.com/partynet',
      'https://instagram.com/partynet',
      'https://pinterest.com/partynet'
    ]
  };
  
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </Head>
  );
}
