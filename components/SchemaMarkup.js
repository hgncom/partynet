import Head from 'next/head';

export default function SchemaMarkup({ postData }) {
  if (!postData) return null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: postData.title,
    description: postData.excerpt,
    image: postData.featuredImage,
    datePublished: postData.date,
    dateModified: postData.date,
    author: {
      '@type': 'Person',
      name: postData.author || 'Party Planning Expert'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Party.net',
      logo: {
        '@type': 'ImageObject',
        url: 'https://partynet.netlify.app/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://partynet.netlify.app/posts/${postData.id}`
    }
  };

  // Add FAQ schema if the post has FAQ section
  if (postData.contentHtml && postData.contentHtml.includes('<h2>Frequently Asked Questions</h2>')) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: []
      // This would ideally be populated dynamically based on the actual FAQ content
      // For now, we'll just include the schema structure
    };
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </Head>
  );
}
